import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureAttribution } from "./lib/leads";

// Remember the landing page's UTM tags and referrer so form leads are credited to the right campaign.
captureAttribution();

createRoot(document.getElementById("root")!).render(<App />);
