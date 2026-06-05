document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("accountForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Validation check (calling the function from form.html)
            if (typeof validateForm === "function" && !validateForm()) {
                return;
            }

            let fname = document.getElementById("firstname").value;
            let lname = document.getElementById("lastname").value;
            let dob = document.getElementById("dob").value;
            let gender = document.getElementById("gender").value;
            let mobile = document.getElementById("mobile").value;
            let email = document.getElementById("email").value;
            let aadhaar = document.getElementById("aadhaar").value;
            let pan = document.getElementById("pan").value;
            let deposit = Number(document.getElementById("deposit").value);
            let address = document.getElementById("address").value;
            let password = document.getElementById("password").value;

            let accNo = "ACC" + Math.floor(100000 + Math.random() * 900000);

            let accountData = {
                firstname: fname,
                lastname: lname,
                dob: dob,
                gender: gender,
                mobile: mobile,
                email: email,
                aadhaar: aadhaar,
                pan: pan,
                balance: deposit,
                address: address,
                password: password, // Saved for login validation
                accNo: accNo
            };

            localStorage.setItem(accNo, JSON.stringify(accountData));
            // Also save by email/username for easy login
            localStorage.setItem(email, JSON.stringify(accountData));

            alert("Account Created Successfully!\nYour Account Number: " + accNo);
            form.reset();
            window.location.href = "welcome.html";
        });
    }
});

// VIEW ACCOUNT
function getAccount() {
    let accNo = prompt("Enter Account Number to View Details:");
    let data = localStorage.getItem(accNo);
    
    if (data == null) {
        alert("Account Not Found");
    } else {
        let acc = JSON.parse(data);
        alert(`--- Account Details ---\nName: ${acc.firstname} ${acc.lastname}\nAcc No: ${acc.accNo}\nBalance: ₹${acc.balance}\nMobile: ${acc.mobile}`);
    }
}

// MONEY TRANSFER
function transfer() {
    let senderAcc = prompt("Enter Your Account Number:");
    let receiverAcc = prompt("Enter Receiver Account Number:");
    let amount = Number(prompt("Enter Amount to Transfer:"));

    let senderData = localStorage.getItem(senderAcc);
    let receiverData = localStorage.getItem(receiverAcc);

    if (!senderData || !receiverData) {
        alert("Invalid Account Number(s)");
        return;
    }

    let sender = JSON.parse(senderData);
    let receiver = JSON.parse(receiverData);

    if (amount <= 0 || amount > sender.balance) {
        alert("Invalid amount or insufficient balance.");
        return;
    }

    sender.balance -= amount;
    receiver.balance += amount;

    localStorage.setItem(senderAcc, JSON.stringify(sender));
    localStorage.setItem(receiverAcc, JSON.stringify(receiver));

    alert("Transfer Successful!\nRemaining Balance: ₹" + sender.balance);
}

function getHistory() {
    alert("Recent Transactions:\n1. Deposit ₹2000\n2. Transfer ₹1000\n3. Withdraw ₹500");
}

function contactSupport() {
    alert("Customer Support:\nEmail: support@bank.com\nPhone: +91 9876543210");
}