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

                newBotMessage.innerHTML = `👾 <span>${response}</span>`

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
            "1. Basic Scan: nmap target.com",
            "2. Scan Multiple Targets: nmap target1.com target2.com",
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

        // wireshark
        "wireshark": [
            "Here are 30 common Wireshark filters:",
            "1. Filter by IP: ip.addr == 192.168.1.1",
            "2. Filter by Source IP: ip.src == 192.168.1.1",
            "3. Filter by Destination IP: ip.dst == 192.168.1.1",
            "4. Filter by Protocol: tcp, udp, http, dns, etc.",
            "5. Filter by Port: tcp.port == 80",
            "6. Filter by Source Port: tcp.srcport == 80",
            "7. Filter by Destination Port: tcp.dstport == 80",
            "8. Filter by MAC Address: eth.addr == 00:0c:29:xx:xx:xx",
            "9. Filter by HTTP Request Method: http.request.method == \"GET\"",
            "10. Filter by HTTP Response Code: http.response.code == 200",
            "11. Filter by Packet Length: frame.len > 100",
            "12. Filter by TCP SYN Flag: tcp.flags.syn == 1",
            "13. Filter by TCP ACK Flag: tcp.flags.ack == 1",
            "14. Filter by TCP RST Flag: tcp.flags.reset == 1",
            "15. Filter by TCP FIN Flag: tcp.flags.fin == 1",
            "16. Filter by DNS Query: dns.qry.name == \"example.com\"",
            "17. Filter by DNS Response: dns.resp.name == \"example.com\"",
            "18. Filter by ARP Traffic: arp",
            "19. Filter by ICMP Traffic: icmp",
            "20. Filter by SSL/TLS Traffic: ssl",
            "21. Filter by VoIP Traffic: sip or rtp",
            "22. Filter by Broadcast Traffic: eth.dst == ff:ff:ff:ff:ff:ff",
            "23. Filter by Multicast Traffic: ip.dst == 224.0.0.0/4",
            "24. Filter by Specific TCP Stream: tcp.stream eq 5",
            "25. Filter by HTTP Host: http.host == \"example.com\"",
            "26. Filter by HTTP User-Agent: http.user_agent contains \"Chrome\"",
            "27. Filter by HTTP Cookie: http.cookie contains \"sessionid\"",
            "28. Filter by FTP Traffic: ftp",
            "29. Filter by SMTP Traffic: smtp",
            "30. Filter by SSH Traffic: ssh"
        ],

        "bye": ["Goodbye!", "Stay anonymous, stay secure."]
    }
    
    return responseSets[userInput] || ["Sorry, I'm not familiar with this tool."]
}
