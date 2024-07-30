
export type Price={
 active:boolean,
 billing_scheme:string,
 created:number,
 currency:string,
 custom_unit_amount:number | string | null,
 id:string | number,
 livemode:boolean,
 lookup_key:string | number | null,
 metadata:object,
 nickname:null,
 object:string,
 product: string | null,
 recurring: null | string | boolean,
 tax_behavior:string | null,
 tiers_mode: null | string,
 type:string ,
 unit_amount:number,
 unit_amount_decimal:string
}

export type Product={
    active:true,
    attributes:[...any],
    created:number,
    default_price:string | null,
    description:string | null,
    features:[...any],
    id:string,
    images:[...any],
    livemode:false,
    marketing_features:[...any],
    metadata:object,
    name:string,
    object:string,
    package_dimensions: object | null,
    shippable: null | boolean | string,
    statement_descriptor: null | boolean,
    tax_code:null | number,
    type:string,
    unit_label:string | null,
    updated:number,
    url: null | string
}

