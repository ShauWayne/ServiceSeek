import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;

public class TrustAllCerts {
  public static void allowAllSSL() {
    try {
      TrustManager[] trustAllCerts = new TrustManager[]{
        new X509TrustManager() {
          public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[]{};
          }
          public void checkClientTrusted(X509Certificate[] certs, String authType) {
          }
          public void checkServerTrusted(X509Certificate[] certs, String authType) {
          }
        }
      };

      SSLContext sc = SSLContext.getInstance("SSL");
      sc.init(null, trustAllCerts, new java.security.SecureRandom());
      javax.net.ssl.HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
