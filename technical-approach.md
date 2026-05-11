# Technical Approach

## 1. Image Overlay Logic
The core personalization feature of the app relies on dynamic image composition. On native devices (iOS/Android), we use `react-native-view-shot` to capture a specific React Native `<View>` via a `captureRef`. This process flattens the layered DOM elements—the background `Image`, the absolute-positioned header bar, the quote overlay, and the overlapping circular avatar—into a single, shareable PNG file. On Web environments, we achieve the exact same behavior using `html2canvas` to parse and render the equivalent HTML/CSS DOM node into an image blob.

## 2. Tech Stack
- **React Native & Expo (SDK 54)**: Provides a robust cross-platform foundation allowing unified code for iOS, Android, and Web.
- **Expo Router**: Handles file-based, deep-linkable navigation natively and on the web.
- **Firebase (Auth, Firestore, Storage)**: Enables scalable backend services for authentication, persisting templates, and hosting user profile pictures.
- **Zustand**: Minimalist and highly performant global state management for the user's session and profile data.
- **react-native-view-shot / html2canvas**: Crucial for capturing our layered React Native Views into shareable image formats.
- **expo-linear-gradient**: Renders smooth visual gradients, critical for text overlays on varied backgrounds.
- **lucide-react-native**: Provides consistent, high-quality vector icons across the platform.

## 3. Challenges & Solutions
During the development of the UI Overhaul, we encountered and resolved four primary technical challenges:
- **Navigation Race Condition**: Expo Router attempted to navigate via `router.replace` before the root layout was fully mounted. *Solution*: Implemented the `useRootNavigationState()` hook to strictly guard routing logic until the layout key was initialized.
- **Web Layout Collapse (`aspectRatio`)**: On React Native Web, using `aspectRatio: 0.75` on flex-children caused the cards to collapse to zero height. *Solution*: Replaced relative aspect ratios with explicit, dynamically calculated pixel heights (`CARD_WIDTH / 0.75`) to guarantee layout stability.
- **DOM Ref Errors in ViewShot**: Referencing complex React nodes dynamically sometimes failed when switching between Web and Native capture libraries. *Solution*: Abstracted capture logic into platform-specific files (`captureService.ts` and `captureService.web.ts`) providing tailored handling per environment.
- **Lucide Icon Crash**: The `Chrome` icon triggered an "Element type is invalid" crash on React Native Web because it was not exported in the specific version installed. *Solution*: Implemented a custom styled `<Text>` Google 'G' badge, eliminating the external dependency and preventing the crash entirely.

## 4. Future Improvements
- **AI-Generated Quotes**: Integrate the Anthropic Claude API to dynamically generate personalized wishes based on the user's input or the recipient's relationship.
- **RevenueCat Integration**: Implement robust in-app purchases and subscription tracking to handle the premium unlocks.
- **Cloudflare CDN**: Host and serve the high-resolution template images via a CDN for faster global loading speeds.
- **Text Customization**: Add Draggable and Scalable text overlays allowing users to fully customize the typography, color, and positioning of their quotes on the card.
