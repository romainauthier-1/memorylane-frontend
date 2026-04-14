import "../styles/globals.css";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
// Imports redux-persist
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import memories from "../reducers/memories";
import states from "../reducers/states";

// Ajouter combineReducers
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Définir le ou les reducer(s) de l'application avec combineReducers :
const reducers = combineReducers({ memories, states });

// Utiliser une clé de stockage pour définir le nom du store à l’intérieur du local storage :
const persistConfig = { key: "MemoryLane", storage };

// Mettre à jour le contenu du store avec configureStore :
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Transformer le store pour qu’il soit persistant :
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>MemoryLane</title>

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/AppIconMemoryLane_v2.png"
            />

            <meta name="theme-color" content="#7c3aed" />

            <meta name="apple-mobile-web-app-capable" content="yes" />

            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="black-translucent"
            />

            <meta name="apple-mobile-web-app-title" content="MemoryLane" />
          </Head>
          <ToastContainer />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
