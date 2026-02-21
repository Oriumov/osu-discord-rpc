# 🎮 osu! Discord Rich Presence

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey)
![Discord RPC](https://img.shields.io/badge/Discord-RPC-5865F2)

A lightweight application that displays your current osu! game state in Discord Rich Presence. Shows real-time information about the beatmap, accuracy, combo, and PP.

## ✨ Features

- 📊 Current beatmap display (Artist - Title [Difficulty])
- 🎯 Live accuracy tracking
- 💯 Combo (current/max)
- 📈 PP (current and FC)
- ⭐ Star rating
- 🔧 Active mods
- 🎨 Beatmap cover as large image
- 🔗 Button to open beatmap in browser

## 📋 Requirements

- Windows 7/8/10/11
- [Discord](https://discord.com/) (running)
- [osu!](https://osu.ppy.sh/) (running)
- [tosu](https://github.com/tosuapp/tosu/releases) (running)

## 🚀 Installation & Usage

### Quick Start (Recommended)

1. Download the latest `osu-rpc.exe` from releases
2. Launch osu! and tosu
3. Run `osu-rpc.exe`
4. Done! Your Discord status will update automatically

### Building from Source

1. Install [Node.js](https://nodejs.org/) (version 18 or higher)
2. Download the source code
3. Open terminal in the program folder
4. Install dependencies:
   ```bash
   npm install
   ```
   Build the .exe file:

```bash
npm run build
```
Run:

```bash
.\osu-rpc.exe
```
📖 How to Use
Launch osu!

Launch tosu (must be running before RPC)

Run osu-rpc.exe (right-click → Run as administrator if issues occur)

Open Discord - your profile will show the current osu! status

The program runs in the background. To stop it, close the console window or press Ctrl+C.

🔧 Configuration
By default, the program connects to tosu at localhost:24050. If you're using a different port or address, modify the WS_V2 variable in the source code:

```javascript
const WS_V2 = "ws://127.0.0.1:24050/websocket/v2"; // default port
```
🖼️ Display Example
In Discord, you'll see:

<img width="296" height="168" alt="image" src="https://github.com/user-attachments/assets/73e028f7-182a-44aa-ba2b-251301bd1405" />



🎵 Artist - Title [Difficulty]
🟦300 🟩100 🟪50 ❌Miss
★ 6.42 | 98.76% | 456pp (FC 512) | 789x/1234x | HDHR
⚠️ Troubleshooting
Status not showing in Discord
Make sure Discord is running

Verify tosu is running (check http://localhost:24050 in your browser)

Try restarting osu-rpc.exe as Administrator (right-click → Run as administrator)

WebSocket connection error
Check if tosu is working (open http://localhost:24050 in browser)

Verify no firewall/antivirus is blocking the connection

Try running tosu as Administrator

Run osu-rpc.exe as Administrator

Program won't start
Install Microsoft Visual C++ Redistributable

Run as Administrator

Check if Windows Defender or antivirus is blocking the program

Program starts but closes immediately
Open Command Prompt as Administrator

Navigate to the program folder

Run osu-rpc.exe manually to see error messages

Always try running as Administrator first

📝 Notes
Status updates every 5 seconds

Internet connection required

Discord RPC has a 128 character limit for text fields

Running as Administrator can resolve most permission-related issues

🛠️ Technical Details
Built with Node.js

Uses WebSocket connection to tosu

Discord Rich Presence integration via discord-rpc

🤝 Credits


[tosu](https://github.com/tosuapp/tosu/releases) 

[discord-rpc](https://github.com/discord/discord-rpc) 

📄 License
MIT License
