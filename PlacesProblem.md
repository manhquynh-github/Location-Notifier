This file includes common fixes to some errors.

# Module react-native-google-places

## Cause

`react-native-google-places` has been missing some configs and methods, which results in unexpected behaviours when working with Expo SDK.

## Fix

1. Add these to `node_modules/react-native-google-places/android/build.gradle`

   ```
   repositories {
       maven { url 'https://maven.fabric.io/public' }
   }
   dependencies {
       def googlePlayServicesVersion = rootProject.hasProperty('googlePlayServicesVersion') ? rootProject.googlePlayServicesVersion : DEFAULT_GOOGLE_PLAY_SERVICES_VERSION
       def androidMapsUtilsVersion = rootProject.hasProperty('androidMapsUtilsVersion') ? rootProject.androidMapsUtilsVersion : DEFAULT_ANDROID_MAPS_UTILS_VERSION
       compileOnly 'com.facebook.react:react-native:+'
       implementation "com.google.android.gms:play-services-base:$googlePlayServicesVersion"
       implementation "com.google.android.gms:play-services-places:$googlePlayServicesVersion"
       implementation "com.google.android.gms:play-services-location:$googlePlayServicesVersion"
       implementation "com.google.maps.android:android-maps-utils:$androidMapsUtilsVersion"
       implementation('host.exp.exponent:expoview:31.0.0@aar') {
           transitive = true
           exclude group: 'com.squareup.okhttp3', module: 'okhttp'
           exclude group: 'com.squareup.okhttp3', module: 'okhttp-urlconnection'
       }
   }
   ```

1. Add these to `node_modules/react-native-google-places/android/src/main/java/com/arttitude360/reactnative/rngoogleplaces/RNGooglePlacesModule.java`

   ```java
   // ...

   import host.exp.exponent.ActivityResultListener;
   import host.exp.expoview.Exponent;

   public RNGooglePlacesModule(ReactApplicationContext reactContext) {
       // ...
       Exponent.getInstance().addActivityResultListener(mActivityEventListener);
   }

   // ...

   private final ActivityResultListener mActivityEventListener = new ActivityResultListener() {
       @Override
       public void onActivityResult(int requestCode, int resultCode, Intent data) {
           // Check that the result was from the autocomplete widget.
           if (requestCode == AUTOCOMPLETE_REQUEST_CODE) {
               if (resultCode == Activity.RESULT_OK) {
                   // Get the user's selected place from the Intent.
                   Place place = PlaceAutocomplete.getPlace(getReactApplicationContext(), data);
                   Log.i(TAG, "Place Selected: " + place.getName());

                   WritableMap map = propertiesMapForPlace(place);

                   resolvePromise(map);

               } else if (resultCode == PlaceAutocomplete.RESULT_ERROR) {
                   Status status = PlaceAutocomplete.getStatus(getReactApplicationContext(), data);
                   Log.e(TAG, "Error: Status = " + status.toString());
                   rejectPromise("E_RESULT_ERROR", new Error(status.toString()));
               } else if (resultCode == Activity.RESULT_CANCELED) {
                   // Indicates that the activity closed before a selection was made. For example if
                   // the user pressed the back button.
                   rejectPromise("E_USER_CANCELED", new Error("Search cancelled"));
               }
           }

           if (requestCode == PLACE_PICKER_REQUEST_CODE) {
               if (resultCode == Activity.RESULT_OK) {
                   Place place = PlacePicker.getPlace(getReactApplicationContext(), data);

                   Log.i(TAG, "Place Selected: " + place.getName());

                   WritableMap map = propertiesMapForPlace(place);

                   resolvePromise(map);
               }
           }

           if (requestCode == PLACES_RESOLUTION_CODE) {
               Log.i(TAG, "Google API Client resolution result: " + resultCode);
               if (resultCode == Activity.RESULT_OK) {
                   if (!mGoogleApiClient.isConnecting() &&
                           !mGoogleApiClient.isConnected()) {
                       mGoogleApiClient.connect();
                   }
               }
           }
       }
   };
   ```

1. Open `android` in Android Studio.

1. Sync Gradle.
