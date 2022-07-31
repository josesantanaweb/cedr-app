Eliminar node_modules
Eliminar package-lock.json
Eliminar yarn.lock
Eliminar Pods
Eliminar Podfile.lock

Limpiar cache iOS - Android

## Android:

cd android
./gradlew clean

## iOS

cd ios
xcodebuild clean

Para error de los pods en iOS
nvm alias default 16.14.2
nvm unalias default

yarn
ios
pod install
