"use client";
import { Provider } from "react-redux";
import DisplayUserDetails from "./components/DisplayUserDetails";
import store from "./store/appStore";

export default function HomePage() {
  return (
    <div>
      {/* store Provider */}
      <Provider store={store}>
        <DisplayUserDetails />
      </Provider>
    </div>
  );
}
