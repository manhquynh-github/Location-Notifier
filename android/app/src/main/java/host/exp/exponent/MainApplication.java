package host.exp.exponent;


import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;

import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import expolib_v1.okhttp3.OkHttpClient;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;

import com.emekalites.react.alarm.notification.ANPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;

public class MainApplication extends ExpoApplication {
  @Override
  public void onCreate() {
    super.onCreate();
    String id = "1997";					// The id of the channel.
    CharSequence name = "Địa điểm";			// The user-visible name of the channel.
    String description = "Địa điểm sắp tới";	// The user-visible description of the channel.

    if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel mChannel = new NotificationChannel(id, name, NotificationManager.IMPORTANCE_DEFAULT);

      // Configure the notification channel.
      mChannel.setDescription(description);

      mChannel.enableLights(true);
      // Sets the notification light color for notifications posted to this
      // channel, if the device supports this feature.
      mChannel.setLightColor(Color.RED);

      mChannel.enableVibration(true);
      mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});

      NotificationManager mNotificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);
      mNotificationManager.createNotificationChannel(mChannel);
    }
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add native modules!

        // Needed for `react-native link`
        // new MainReactPackage(),
            new RNFirebasePackage(),
            new RNFirebaseDatabasePackage(),
            new ANPackage(),
            new RNGooglePlacesPackage(),
            new BackgroundGeolocationPackage()
    );
  }

  @Override
  public String gcmSenderId() {
    return getString(R.string.gcm_defaultSenderId);
  }

  @Override
  public boolean shouldUseInternetKernel() {
    return BuildVariantConstants.USE_INTERNET_KERNEL;
  }

  public static OkHttpClient.Builder okHttpClientBuilder(OkHttpClient.Builder builder) {
    // Customize/override OkHttp client here
    return builder;
  }
}
