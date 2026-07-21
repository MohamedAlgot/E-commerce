export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,

  database: {
    url: process.env.DB_URL,
  },
  
  redis:{
    host:process.env.REDIS_URL,
  },

  COD_FEES: process.env.COD_FEES || 20,

  Kashier: {
    api_key: process.env.KASHIER_API_KEY,
    secret_key: process.env.KASHIER_SECRET_KEY,
    merchantId: process.env.KASHIER_MERCHANT_ID,
  },
  mailer:{
    host:process.env.MAILER_HOST,
    port:process.env.MAILER_PORT,
    user:process.env.MAILER_USER,
    pass:process.env.MAILER_PASS
  },
  jwt:{
    secret:process.env.JWT_SECRET 
  }
});
