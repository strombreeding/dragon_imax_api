// import admin from 'firebase-admin';
import { credential, initializeApp } from 'firebase-admin';
// import serviceAccount from './dragon-imax-push-firebase-adminsdk-dnvs1-f65baaac13.json';
const zz = JSON.stringify({
  type: 'service_account',
  project_id: 'dragon-imax-push',
  private_key_id: 'f65baaac138c7cccda5e1fe37022d50bc0299a51',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCVOobYqjBFjCIq\ns71ElYbNYtxPc0idiGx3/iLXTLp75t+7cr6Y2VVDG6ghLEPu6w2wJBVNLT6qm1uh\nD9tVNDiQIDi7iyrX0jejG6C4sKptbzb2oIL1wx/FXtEMa7DcH5j2tuZ2vApbAbAV\no+U0xsAgzfHcHgmZGhyPzfzOvhHgruqPLDj445+SDGhyyFlBCMFWz05YmaubITPQ\nCyiFUV+xvjqd+0tecAzaCj0ql/5UEP4xjIBK3XLWFOyRgmod4M215fcC19ytdawc\nnfy2QKia5xBMHYZod+z3/wRCD5QKkMvnpDlZ/3/6s3Jyq0JES3DpxzDIKB2o6L05\nQDBIEh81AgMBAAECggEACYM561UrTz5NQ0RCkWeoDdmlH5oYC+q8DLNyNx/uAfid\nVHlOYGH3nG0xPNlx2dNkA6bD24VB1GWjjqh7G9BWDAyccTVq3WfKIidLCdrr0klf\noJMU0LkdLQYL9MBnUsY03a1FEwE49m+CG68J7QuqXaz4ePFKkqw7xohOpZiE0o9a\n6ZqDnME56zDChS9HbUPCPZomCoLyaUC5mq5XQOcGLiCDwqVCUXuRgbe4RccinUQj\nzTB4lXrGLwxm1l0QNsAq7v1Xuywq++dKYD0Sa0p8xNLAKJEqyM//fbdnyVi3JLe4\ngBAXux6iWj8MeQ5heO23oEVh1i4kJP5qDshHGAtClQKBgQDSgZ8LKocEl7B8Z/Dq\nOqHikK65GW3Yh3yEvdQUstmxYBchrHlrR0v40EMdAO0runCbv5rtMAhz7tWYOBhg\nTXth1Tlg0oDq7lW9LqT9mOAYLFjZ0AAj+PoE0qvqCJzZ913VqZn1JLXD9/wJUhck\nqnnzu9Oc04qeuNZLqM3PaX9i4wKBgQC1eq6qGkucR7Y+Um1DKEb+t/f0+/MgYI8+\nyNkZ36/EED8n8l0xPRQ/q9MOGJYl2kUI9W4V4CV5gvCdSOVGObCMJCUeHPtdWMX1\nsvRmtshi4hLxTXuG9WXocwLmNuJyqMmce6ZQWUGjHllIuZ6kvcGvofNd+c4HWvKo\nUINW8WzZBwKBgEUY1yPLKdaQFBZB6Ap6hHjiFPgdKLlSf8TyqpLAwkQ+zlj3TEOy\ne3WIpv72NuOLpzr4gdopUhz74JC+mQHDbSSH4PWvIzH6WZpnnTDA5Y4JwIB+jg1A\nxJCgtl1zxkilsd9YdHjLO/6/f7Nvhrk6XB1tIeDwbyf6dB0Ro7zZXD8RAoGAXH8i\nJSrv3MCkP5GNhQwzW0JzDBeabKcqe4qtNMXQ9TJ+riKWozEJcAZotSeM59AfHZjS\nOi4bi5pUfyYXTbq7pEIL9RQ6ffJwO3GxpeSFr/igRQMD8d6DyX1NPf89XclvsOVI\n+Gz1ymj+gtWw6TCaVqVJwF1BSHhvc6BNwPOeUeMCgYBIyrzjuqtedAN/qNsSlYz2\nQXCSUCHSI7CQCFAORmqKEoWDWM2nLG1qqLfXWEPY5/g4ILmDvYmAd+ahZtuuvj7V\naY+LRIacPymaEJXbsvC9++qa+8kSFa0fhqhpwUgdlMsrDnck4wlYSwSCYzLM+S8Q\nS1/aoKERk24HIRkZBytZkw==\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-dnvs1@dragon-imax-push.iam.gserviceaccount.com',
  client_id: '105455857582160517953',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dnvs1%40dragon-imax-push.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
});

// export const firebaseApp = () => {
//   try {
//     initializeApp({
//       credential: credential.cert(JSON.parse(zz)),
//     });
//   } catch (err) {
//     console.log('Errrrr', err);
//   }
// };
