# BotScout

BotScout  is a first-of-its-kind platform that combines real-time AI discovery with auto-generated visual workflows. It not only surfaces trending models, tools, and research from GitHub, Hugging Face, and ArXiv, but also transforms complex repositories into intuitive flow diagrams, making it easy to understand architecture, dependencies, and implementation at a glance. The application is deployed at [https://botscout.vercel.app](https://botscout.vercel.app).


## 🔍 Key Features

- **Real-Time AI Discovery**  
  Discover trending and emerging AI models, tools, and research papers from:
  - 🐙 GitHub
    
    ![{8F9E95AE-B850-4111-84B4-EA7EE37A34DE}](https://github.com/user-attachments/assets/2a883e79-8965-4f62-b4f2-6ba42b1c36f8)

  - 🤗 Hugging Face
 
    ![{936DE564-014E-4DF8-BD1A-D798F19FA978}](https://github.com/user-attachments/assets/bc0972c7-0ef0-4f0e-afa9-4953a8593b58)

  - 📄 ArXiv
 
    ![{C9122EFA-88C6-43B5-9EA2-8D9D7DE8779C}](https://github.com/user-attachments/assets/13bb0710-da84-49d6-a893-23208ac7614c)

  
  - 🧑‍💻 User registration and secure login
    
    ![{5518D9FF-EC38-4B3B-9063-C839009FF837}](https://github.com/user-attachments/assets/075a5a53-2e71-484b-bc98-bb3ff4c53c9a)

  - 🔒 Protected features for signed-in users

    ![{8C357BB6-6CC7-4CF7-821C-5444297BF8D4}](https://github.com/user-attachments/assets/3932c600-75a3-4f69-baa3-883d2050f17b)


- **Auto-Generated Visual Workflows**  
  Converts complex codebases and research implementations into interactive diagrams:
  - Understand code structure in seconds
  - Visualize model pipelines, training loops, and dependencies
  - Navigate repositories without digging through files

    ![image](https://github.com/user-attachments/assets/8ddae218-4b0e-4620-b128-959868e8d671)


- **Architecture at a Glance**  
  See how components interact:
  - APIs, datasets, training modules, and configs
  - Automatic detection of data flows and key function calls
 
## Technologies Used

- **Frontend**: Next.js  
- **Backend**: Firebase Functions  
- **Database**: Firebase Firestore  
- **Deployment**: Vercel
- **AI/Automation**: Custom scrapers + Gemini
- **APIs/Data Sources**: GitHub API, Hugging Face API, ArXiv API

## 🚀 Use Cases

- **Developers**: Quickly evaluate new AI projects without reading the entire codebase  
- **Researchers**: Visualize implementations to understand research faster  
- **Product Teams**: Communicate system architecture clearly with visuals  
- **Educators**: Teach students how real-world AI systems are structured  
 

## 📦 Coming Soon

- GitHub login and repo explorer  
- Drag-and-drop visualization editor  
- Plugin support for VS Code and Jupyter  
- AI assistant for repo Q&A  

## Getting Started

To run this project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Nithin9585/botscout.git


2. **Navigate to the project directory:**:

   ```bash
    cd botscout
3. **Install dependencies:**:

   ```bash
   npm install

4. **Set up environment variables:**:

    Create a .env.local file in the root of the project
  
5. **Run the development server:**:

   ```bash
   npm run dev
