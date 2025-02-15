document.addEventListener("DOMContentLoaded", () => {
    let savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
        document.body.classList.add(savedTheme)
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "☀️" : "🌙"
    }
})

function toggleTheme() {
    let body = document.body
    let themeToggle = document.querySelector(".theme-toggle")

    body.classList.toggle("dark-mode")
    body.classList.toggle("light-mode")

    if (body.classList.contains("light-mode")) {
        themeToggle.textContent = "☀️"
        localStorage.setItem("theme", "light")
    } else {
        themeToggle.textContent = "🌙"
        localStorage.setItem("theme", "dark")
    }
}

function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active")
}

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage()
    }
})

function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim().toLowerCase()
    if (userInput === "") return

    let chatBox = document.getElementById("chat-box")

    let userMessage = document.createElement("div")
    userMessage.className = "user-message"
    userMessage.innerHTML = `🕵️‍♂️ ${userInput}`
    chatBox.appendChild(userMessage)

    document.getElementById("user-input").value = ""

    let botMessage = document.createElement("div")
    botMessage.className = "bot-message"
    botMessage.innerHTML = '👾 <span class="typing">Thinking...</span>'
    chatBox.appendChild(botMessage)

    chatBox.scrollTop = chatBox.scrollHeight

    setTimeout(() => {
        let responses = generateBotResponse(userInput)
        botMessage.remove()

        responses.forEach((response, index) => {
            setTimeout(() => {
                let newBotMessage = document.createElement("div")
                newBotMessage.className = "bot-message"

                if (response.includes("hydra") || response.includes("nmap") || response.includes("ssh") || response.includes("ftp")) {
                    newBotMessage.innerHTML = `👾 <span>${response}</span> <button class="copy-btn" onclick="copyToClipboard(this)">📋</button>`
                } else {
                    newBotMessage.innerHTML = `👾 <span>${response}</span>`
                }

                chatBox.appendChild(newBotMessage)
                chatBox.scrollTop = chatBox.scrollHeight
            }, index * 2000)
        })
    }, 2000)
}

function generateBotResponse(userInput) {
    const responseSets = {
        "hi": ["Hello!", "Please share the tool name to know commands for, like hydra, nmap, etc."],
        "hello": ["Hello!", "Please share the tool name to know commands for, like hydra, nmap, etc."],

        // hydra
        "hydra": [
            "Here are 10 common Hydra commands:",
            "1. Brute-force SSH: hydra -L users.txt -P passwords.txt ssh://192.168.1.1",
            "2. Brute-force FTP: hydra -l admin -P passwords.txt ftp://192.168.1.1",
            "3. Brute-force HTTP POST form: hydra -l admin -P passwords.txt 192.168.1.1 http-post-form \"/login.php:user=^USER^&pass=^PASS^:Invalid password\"",
            "4. Brute-force RDP: hydra -L users.txt -P passwords.txt rdp://192.168.1.1",
            "5. Brute-force SMTP: hydra -l user@domain.com -P passwords.txt smtp://192.168.1.1",
            "6. Brute-force MySQL: hydra -L users.txt -P passwords.txt mysql://192.168.1.1",
            "7. Brute-force Telnet: hydra -L users.txt -P passwords.txt telnet://192.168.1.1",
            "8. Brute-force POP3: hydra -L users.txt -P passwords.txt pop3://192.168.1.1",
            "9. Brute-force SMB: hydra -L users.txt -P passwords.txt smb://192.168.1.1",
            "10. Brute-force VNC: hydra -P passwords.txt vnc://192.168.1.1"
        ],

        // nmap
        "nmap": [
            "Here are 30 common Nmap commands:",
            "2. Scan Multiple Targets:nmap target1.com target2.com",
            "1. Basic Scan: nmap target.com",
            "3. Scan IP Range: nmap 192.168.1.1-100",
            "4. Scan Subnet: nmap 192.168.1.0/24",
            "5. Scan Specific Ports: nmap -p 80,443 target.com",
            "6. Scan All Ports: nmap -p- target.com",
            "7. Scan Top N Ports: nmap --top-ports 100 target.com",
            "8. UDP Scan: nmap -sU target.com",
            "9. OS Detection: nmap -O target.com",
            "10. Service Version Detection: nmap -sV target.com",
            "11. Aggressive Scan: nmap -A target.com",
            "12. Stealth Scan (SYN Scan): nmap -sS target.com",
            "13. TCP Connect Scan: nmap -sT target.com",
            "14. ACK Scan: nmap -sA target.com",
            "15. FIN Scan: nmap -sF target.com",
            "16. Xmas Scan: nmap -sX target.com",
            "17. Null Scan: nmap -sN target.com",
            "18. Idle Scan (Zombie Scan): nmap -sI zombie_ip target.com",
            "19. Ping Scan: nmap -sn target.com",
            "20. Fragment Packets: nmap -f target.com",
            "21. Use Decoys: nmap -D decoy1,decoy2,decoy3 target.com",
            "22. Spoof Source IP: nmap -S spoofed_ip target.com",
            "23. Source Port: nmap --source-port 53 target.com",
            "24. Timing Template: nmap -T4 target.com",
            "25. Script Sca*: nmap --script script_name target.com",
            "26. Vulnerability Scan: nmap --script vuln target.com",
            "27. HTTP Enumeration: nmap --script http-enum target.com",
            "28. Save Output to File: nmap -oN output.txt target.com",
            "29. Save Output to XML: nmap -oX output.xml target.com",
            "30. Save Output in All Formats: nmap -oA output target.com"
        ],
        "bye": ["Goodbye!", "Stay anonymous, stay secure."]
    }
    
    return responseSets[userInput] || ["Sorry, I'm not familiar with this tool."]
}

function copyToClipboard(button) {
    let textToCopy = button.previousElementSibling.textContent
    navigator.clipboard.writeText(textToCopy).then(() => {
        button.textContent = "✅"
        setTimeout(() => {
            button.textContent = "📋"
        }, 1500)
    }).catch(err => console.error("Failed to copy: ", err))
}
