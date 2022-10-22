import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../../WindowRef';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from '../../core/services/stripe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ClientService } from 'src/app/data/services/client.service';

declare global {
  interface Window {
    Stripe?: any;
  }
}

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  private readonly STRIPE!: any; //TODO: window.Stripe
  private elementStripe!: any;

  username?: string;

  cardNumber: any;
  cardCvv: any;
  cardExp: any;
  form: FormGroup = new FormGroup({});
  id!: string;
  orderData!: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private stripeService: StripeService,
    private router: Router,
    private readonly dataSharingService: DataSharingService,
    private readonly tokenService: TokenService,
    private readonly clientService: ClientService
  ) {
    this.STRIPE = window.Stripe(environment.stripe_pk);
    this.dataSharingService.username.subscribe((value) => {
      this.username = value;
    });
  }

  ngOnInit(): void {
    this.id = this.tokenService.getIdFromToken()!;

    this.form = this.fb.group({
      amount: [
        environment.subscriptionPrice.toFixed(2),
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      cardNumber: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
      cardCvv: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
      cardExp: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
    });

    this.loadUserDetail();
    this.createStripeElement();
  }

  loadUserDetail(): void {
    this.clientService.getUserProfile(this.id).subscribe(
      (res) => {
        const { isPremium } = res.body.data;
        if (isPremium) {
          this.form.disable();
          this.toastr.error('Ya eres premium');
          //TODO: redirect to home
        }
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  private createStripeElement = () => {
    const style = {
      base: {
        color: '#000000',
        fontWeight: 400,
        fontFamily: "'Poppins', sans-serif",
        fontSize: '20px',
        '::placeholder': {
          color: '#E3E2EC',
        },
      },
      invalid: {
        color: '#dc3545',
      },
    };

    //TODO: SDK de Stripe inicia la generacion de elementos
    this.elementStripe = this.STRIPE.elements({
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap',
        },
      ],
    });

    //TODO: SDK Construimos los inputs de tarjeta, cvc, fecha con estilos
    const cardNumber = this.elementStripe.create('cardNumber', {
      placeholder: '4242 4242 4242 4242',
      style,
      classes: {
        base: 'input-stripe-custom',
      },
    });
    const cardExp = this.elementStripe.create('cardExpiry', {
      placeholder: 'MM/AA',
      style,
      classes: {
        base: 'input-stripe-custom',
      },
    });
    const cardCvc = this.elementStripe.create('cardCvc', {
      placeholder: '000',
      style,
      classes: {
        base: 'input-stripe-custom',
      },
    });

    //TODO: SDK Montamos los elementos en nuestros DIV identificados on el #id
    cardNumber.mount('#card');
    cardExp.mount('#exp');
    cardCvc.mount('#cvc');

    this.cardNumber = cardNumber;
    this.cardExp = cardExp;
    this.cardCvv = cardCvc;

    //TODO: Escuchamos los eventos del SDK
    this.cardNumber.addEventListener('change', this.onChangeCard.bind(this));
    this.cardExp.addEventListener('change', this.onChangeExp.bind(this));
    this.cardCvv.addEventListener('change', this.onChangeCvv.bind(this));
  };

  async initPay(): Promise<any> {
    try {
      this.form.disable();
      //TODO: SDK de Stripe genera un TOKEN para la intencion de pago!
      const { token } = await this.STRIPE.createToken(this.cardNumber);

      //TODO: Enviamos el token a nuesta api donde generamos (stripe) un metodo de pago basado en el token
      //TODO: tok_23213
      const { data } = await this.stripeService.generatePaymentMethod(
        token.id,
        this.username!
      );

      //TODO: Nuestra api devolver un "client_secret" que es un token unico por intencion de pago
      //TODO: SDK de stripe se encarga de verificar si el banco necesita autorizar o no

      this.STRIPE.handleCardPayment(data.client_secret)
        .then(async () => {
          //TODO: 👌 Money Money!!!
          await this.stripeService.confirmPremium(this.id);
          this.dataSharingService.username.next(this.username!);
          this.toastr.success('Se ha procesado correctamente tu suscripción');
          this.router.navigateByUrl('/');

          //TODO: Enviamos el id "localizador" de nuestra orden para decirle al backend que confirme con stripe si es verdad!
        })
        .catch((error: any) => {
          this.toastr.error('Error con el pago');
        });
    } catch (e) {
      (
        //this.toastr.open({text: 'Algo ocurrio mientras procesaba el pago', caption: 'ERROR', type: 'danger'})
        err: { error: { message: string | undefined } }
      ) => {
        this.toastr.error(
          err.error.message,
          'Algo ocurrio mientras procesaba el pago'
        );
      };
    }
  }

  //TODO: Manejadores de validacion de input de stripe

  onChangeCard({ error }: any) {
    this.form.patchValue({ cardNumber: !error });
  }

  onChangeCvv({ error }: any) {
    this.form.patchValue({ cardCvv: !error });
  }

  onChangeExp({ error }: any) {
    this.form.patchValue({ cardExp: !error });
  }
}
