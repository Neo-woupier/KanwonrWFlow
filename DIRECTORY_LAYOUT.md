/*

======================================================================
⚠️ IMPORTANT NOTICE & DISCLAIMER
======================================================================
- TEMPLATE ONLY: This file represents a REFERENCE TEMPLATE/EXAMPLE of the intended directory layout. It does NOT mirror the live, active production files of this repository yet.
- ACTION REQUIRED: Once the actual project structure is fully finalized, implemented, and dropped into production, THIS TEMPLATE FILE MUST BE COMPLETELY DELETED to prevent confusion.

======================================================================
PROJECT KNOWLEDGE BASE: FRONTEND ARCHITECTURE & DIRECTORY STRUCTURE
======================================================================

1. OVERVIEW & ARCHITECTURE STRATEGY
----------------------------------------------------------------------
This project implements a highly decoupled Frontend-Backend architecture (Separation of Concerns). 
The client-side is structured for optimal clarity, modularity, and rapid feature expansion. 
Documentation and technical design summaries are intentionally deferred to the final phase of development to prioritize feature implementation and iterative UI/UX polishing.

- Core Tech Stack: React, Vite, TypeScript, Tailwind CSS, Firebase.
- State Management: Global centralized state utilizing a single store pattern (`src/store/useStore.ts`).
- Service Layer: All business logic, Firebase APIs, and data mutations are strictly isolated within the `services/` directory. Components must not fetch or update data directly from Firebase.

2. FULL DIRECTORY TREE & COMPONENT MAPPING (EXAMPLE LAYOUT)
----------------------------------------------------------------------
📁 frontend/
├── 📁 public/                         # Static assets served directly without bundling
│   ├── 🖼️ noise.png                  # Background overlay effect texture
│   └── 🖼️ vite.svg                   # Vite environment logo
├── 📁 src/                            # Source root directory
│   ├── 📁 assets/                     # Media assets processed and optimized by the bundler
│   │   ├── 📁 gifs/                   # Game states, animations, and dynamic UI elements
│   │   │   ├── 🖼️ blackjack-small.gif
│   │   │   ├── 🖼️ crash-card.gif
│   │   │   ├── 🖼️ crash-small.gif
│   │   │   ├── 🖼️ daily-spin.gif
│   │   │   ├── 🖼️ luckycard-small.gif
│   │   │   ├── 🖼️ rakebackfull-card.gif
│   │   │   ├── 🖼️ rakebacknotfull-card.gif
│   │   │   └── 🖼️ slotv1-small.gif
│   │   ├── 📁 images/                 # Static background images and structural textures
│   │   │   ├── 🖼️ sidebar-clove.jpg
│   │   │   ├── 🖼️ sidebar-coin.jpg
│   │   │   ├── 🖼️ sidebar-dice.jpg
│   │   │   └── 🖼️ sidebar-rocket.jpg
│   │   ├── 📁 sounds/                 # Application audio system triggers
│   │   │   ├── 🎵 betplace.mp3        # Triggered when user places a bet
│   │   │   ├── 🎵 cardswipe.mp3       # Triggered during card deal or swipe animation
│   │   │   ├── 🎵 clearbet.mp3        # Triggered when removing stakes
│   │   │   ├── 🎵 lose.mp3            # Triggered on a losing outcome
│   │   │   └── 🎵 win.mp3             # Triggered on a winning outcome
│   │   └── 🖼️ react.svg               # React ecosystem placeholder icon
│   ├── 📁 components/                 # Global, highly reusable layout and UI shells
│   │   ├── 📄 AuthLayout.tsx          # Master shell wrapping Login, Register, and recovery views
│   │   ├── 📄 Footer.tsx              # Standard bottom footer platform information
│   │   ├── 📄 Layout.tsx              # Application master shell (Sidebar + Navbar + Content area)
│   │   ├── 📄 Navbar.tsx              # Top navigation bar containing balance, user profile, status
│   │   ├── 📄 Sidebar.tsx             # Collapsible navigation link panel with custom game category images
│   │   └── 📄 WinnerPanel.tsx         # Live global notification panel showcasing recent wins
│   ├── 📁 firebase/                   # Platform initialization layer
│   │   └── 📄 firebase.ts             # Firebase app client initialization & authentication/firestore exports
│   ├── 📁 pages/                      # Main route-level view components
│   │   ├── 📁 games/                  # Isolated sandbox for all interactive modules
│   │   │   ├── 📁 multiplierrush/
│   │   │   │   └── 📄 MultiplierRush.tsx
│   │   │   ├── 📁 mysterydraw/
│   │   │   │   └── 📄 MysteryDraw.tsx
│   │   │   ├── 📁 spinquestv1/
│   │   │   │   └── 📄 SpinQuestV1.tsx
│   │   │   └── 📁 twentyonechallenge/
│   │   │       ├── 📄 PlayingCard.tsx # Context-aware internal sub-component for card styling
│   │   │       └── 📄 TwentyOneChallenge.tsx
│   │   ├── 📄 Bank.tsx                # Wallet deposit, withdrawal, and transaction log overview
│   │   ├── 📄 Home.tsx                # Main lobby landing page
│   │   ├── 📄 Login.tsx               # User sign-in interface
│   │   └── 📄 Register.tsx            # User account sign-up flow
│   ├── 📁 services/                   # Abstracted API & Backend Data Communication Layer
│   │   ├── 📄 authService.ts          # Core functions managing sign-in, sign-up, sign-out, session recovery
│   │   ├── 📄 userService.ts          # Handles database updates for profiles, statistics, and historical logs
│   │   └── 📄 walletService.ts        # Secure client-side logic handling deposits, withdrawals, and balance updates
│   ├── 📁 store/                      # Global Client State Management (Zustand / Context)
│   │   └── 📄 useStore.ts             # Global hooks handling synchronized states (e.g., active user, real-time balance)
│   ├── 🎨 App.css                     # Main component styling modifications
│   ├── 📄 App.tsx                     # Master Router configuration and global provider assembly
│   ├── 🎨 index.css                   # Tailwind CSS directives, utility configs, custom global variables
│   └── 📄 main.tsx                    # React DOM entrypoint execution layer
└── Config Files                       # Project compiler, engine, linter, and bundler configurations

3. DEVELOPMENT & CODING PRINCIPLES FOR THE AI
----------------------------------------------------------------------
When executing tasks, writing code snippets, or diagnosing issues within this codebase, always adhere strictly to the following architectural guardrails:

- Strict Isolation of UI & Logic: Do not embed raw Firebase operations, Firestore collection calls, or direct external HTTP requests within page views (`src/pages/`) or reusable elements (`src/components/`). Always map actions to the appropriate wrapper located within `src/services/`.
- State Modification: Components must read state properties from `src/store/useStore.ts`. Avoid local state drilling unless the state is absolutely isolated to a single rendering tree.
- Style Integration: Utilize utility classes from Tailwind CSS. Maintain consistent design accents leveraging assets explicitly outlined in `src/assets/`.
- Module Encapsulation: Game-specific auxiliary UI components (such as `PlayingCard.tsx` inside `twentyonechallenge`) must remain inside their respective game directories. They should never clutter the root `src/components/` directory.

4. NEW ADDITIONS: ASSET MANAGEMENT & TESTING GUIDELINES
----------------------------------------------------------------------
- Asset Naming Conventions: All multimedia files added to `src/assets/` (gifs, images, sounds) must strictly follow lowercase kebab-case naming syntax (e.g., `blackjack-small.gif`, `sidebar-rocket.jpg`). No spaces, symbols, or camelCase allowed.
- Environment & Local Mocking: To guarantee fluid UI/UX development before backend services are finalized, all service routines inside `src/services/` should provision temporary frontend fallback mock data if active live Firebase endpoints are disconnected or unconfigured.

*/


📁 backend
├── 📁 .mvn/
│   └── 📁 wrapper/
│       └── 📄 maven-wrapper.properties
├── 📁 src/
│   ├── 📁 main/
│   │   ├── 📁 java/
│   │   │   └── 📁 com/
│   │   │       └── 📁 cnx/
│   │   │           └── 📁 onyxbackend/
│   │   │               ├── 📁 config/
│   │   │               │   └── ☕ FirebaseConfig.java
│   │   │               ├── 📁 controller/
│   │   │               │   ├── ☕ AuthController.java
│   │   │               │   ├── ☕ CrashController.java
│   │   │               │   ├── ☕ LuckyCardController.java
│   │   │               │   ├── ☕ SpinQuestController.java
│   │   │               │   ├── ☕ TwentyOneChallengeController.java
│   │   │               │   └── ☕ UserController.java
│   │   │               ├── 📁 dto/
│   │   │               │   ├── ☕ CrashResponseDTO.java
│   │   │               │   ├── ☕ LuckyCardResponseDTO.java
│   │   │               │   ├── ☕ PlayerHandDTO.java
│   │   │               │   ├── ☕ SpinQuestResponseDTO.java
│   │   │               │   └── ☕ TwentyOneChallengeResponseDTO.java
│   │   │               ├── 📁 model/
│   │   │               │   ├── ☕ CrashSession.java
│   │   │               │   ├── ☕ GameStatus.java
│   │   │               │   ├── ☕ LuckyCardSession.java
│   │   │               │   ├── ☕ PlayerHand.java
│   │   │               │   ├── ☕ SpinQuestSession.java
│   │   │               │   ├── ☕ TwentyOneChallengeSession.java
│   │   │               │   └── ☕ User.java
│   │   │               ├── 📁 repository/
│   │   │               │   ├── ☕ CrashSessionRepository.java
│   │   │               │   ├── ☕ LuckyCardSessionRepository.java
│   │   │               │   ├── ☕ TwentyOneChallengeSessionRepository.java
│   │   │               │   └── ☕ UserRepository.java
│   │   │               ├── 📁 security/
│   │   │               │   ├── ☕ FirebaseAuthenticationFilter.java
│   │   │               │   └── ☕ SecurityConfig.java
│   │   │               ├── 📁 service/
│   │   │               │   ├── ☕ AuthService.java
│   │   │               │   ├── ☕ CrashService.java
│   │   │               │   ├── ☕ LuckyCardService.java
│   │   │               │   ├── ☕ SpinQuestService.java
│   │   │               │   ├── ☕ TransactionService.java
│   │   │               │   ├── ☕ TwentyOneChallengeService.java
│   │   │               │   └── ☕ UserService.java
│   │   │               ├── 📁 util/
│   │   │               │   ├── ☕ DealerUtil.java
│   │   │               │   ├── ☕ DeckUtil.java
│   │   │               │   └── ☕ HandUtil.java
│   │   │               └── ☕ OnyxbackendApplication.java
│   │   └── 📁 resources/
│   │       ├── 📁 static/
│   │       ├── 📁 templates/
│   │       └── 📄 application.properties
│   └── 📁 test/
│       └── 📁 java/
│           └── 📁 com/
│               └── 📁 cnx/
│                   └── 📁 onyxbackend/
│                       ├── 📁 util/
│                       │   └── ☕ HandUtilTest.java
│                       └── ☕ OnyxbackendApplicationTests.java
├── ⚙️ .gitattributes
├── ⚙️ .gitignore
├── 📄 mvnw
├── 📄 mvnw.cmd
└── ⚙️ pom.xml