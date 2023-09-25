web3= new Web3(window.web3.currentProvider); 
var contractAddress='0x0332f4000E3580aDFb3A8AacEAa294C40c7efEc9';
var decentralized_address_p = document.getElementById('decentralized_address');
var abi;
var currentAccount;
var isRewarded;
//var current_account_position;

var c_abi;
var Contract;
var claims;

if(window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
        window.location.reload();
    });
}

async function getCurrentAccount(){
    const acc = await ethereum.request({ method: 'eth_requestAccounts'});
    claims = await Contract.methods.getTotalClaims().call();
	isRewarded = await Contract.methods.isTokensClaimed(acc[0]).call();
    return acc[0];
}

async function getIsNewUser() {
	isRewarded = await Contract.methods.isTokensClaimed(currentAccount).call();
}

const btn = document.getElementById('btn');
const reci_btn = document.getElementById('recipient_btn');

const donor_reg_btn = document.getElementById('btn_reg')
const donor_unreg_btn = document.getElementById('btn_unreg')
const donation_btn = document.getElementById('donate')

const rec_reg_btn = document.getElementById('btn_reg_rec');
const rec_unreg_btn = document.getElementById('btn_unreg_rec')
const claim_btn = document.getElementById('claim')

const fund_btn = document.getElementById('fund_btn')



// btn.addEventListener('click', () => {
//   const form = document.getElementById('donor_fun');
  
//   if (form.style.display === 'none') {
//     // 👇️ this SHOWS the form
//     form.style.display = 'block';
//   } else {
//     // 👇️ this HIDES the form
//     form.style.display = 'none';
//   }
// });

// reci_btn.addEventListener('click', () => {
//     const form = document.getElementById('recipient_fun');
    
//     if (form.style.display === 'none') {
//       // 👇️ this SHOWS the form
//       form.style.display = 'block';
//     } else {
//       // 👇️ this HIDES the form
//       form.style.display = 'none';
//     }
//   });

// donor_reg_btn.addEventListener('click', () => {
//   const form = document.getElementById('change');
//   if (form.style.display === 'none') {
//     // 👇️ this SHOWS the form
//     form.style.display = 'block';
//   } else {
//     // 👇️ this HIDES the form
//     form.style.display = 'none';
//   }
// });

// rec_reg_btn.addEventListener('click', () => {
//     const form = document.getElementById('reg_rec_form');
//     if (form.style.display === 'none') {
//       // 👇️ this SHOWS the form
//       form.style.display = 'block';
//     } else {
//       // 👇️ this HIDES the form
//       form.style.display = 'none';
//     }
//   });

// donor_unreg_btn.addEventListener('click', () => {
//     const form = document.getElementById('unreg_donor_form');
//     if (form.style.display === 'none') {
//       // 👇️ this SHOWS the form
//       form.style.display = 'block';
//     } else {
//       // 👇️ this HIDES the form
//       form.style.display = 'none';
//     }
//   });

//   rec_unreg_btn.addEventListener('click', () => {
//     const form = document.getElementById('unreg_rec_form');
//     if (form.style.display === 'none') {
//       // 👇️ this SHOWS the form
//       form.style.display = 'block';
//     } else {
//       // 👇️ this HIDES the form
//       form.style.display = 'none';
//     }
//   });

// donation_btn.addEventListener('click', () => {
//     const form = document.getElementById('donation_form');
//     if (form.style.display === 'none') {
//       form.style.display = 'block';
//     } else {
//       form.style.display = 'none';
//     }
//   });


c_abi= [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "clid",
				"type": "uint256"
			}
		],
		"name": "acceptClaim",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			}
		],
		"name": "claimNewUserTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "docId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "zip",
				"type": "uint256"
			}
		],
		"name": "createClaim",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "clid",
				"type": "uint256"
			}
		],
		"name": "claimTheClaim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "makeDonation",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "clid",
				"type": "uint256"
			}
		],
		"name": "processClaim",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "role",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "donationAmount",
				"type": "uint256"
			}
		],
		"name": "register",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "clid",
				"type": "uint256"
			}
		],
		"name": "rejectClaim",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transferTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "role",
				"type": "uint256"
			}
		],
		"name": "unregister",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cid",
				"type": "uint256"
			}
		],
		"name": "accessParticularClaim",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim_id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "claimsList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "cId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "enum ReleifFunds.claimStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "requestedAmount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "claimed",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "documentId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "zipcode",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "donatorsList",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "registered",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			}
		],
		"name": "getClaimsIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFundsAvailable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalClaims",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isRewarded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			}
		],
		"name": "isTokensClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "recipientsList",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "registered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalFunds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
Contract = new web3.eth.Contract(c_abi,contractAddress);
getCurrentAccount().then((value)=>{decentralized_address_p.innerHTML+=value; currentAccount = value;});



function register_donor(donor_name, donationAmount){
    console.log("register donor, " + donor_name +", " + donationAmount);
    var success=1;
    var tmp = async function(){ 
        try{
            // role_bytes32 = web3.utils.padLeft(web3.utils.asciiToHex(role), 64);
            return await Contract.methods.register(currentAccount, donor_name, 0, donationAmount).send({from:currentAccount, value: donationAmount});
        } 
        catch(e){
            success=0;
            console.log(e);
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    });    
}

function register_recipient(rec_address){
    console.log("register recipient");
    var success=1;
    var tmp = async function(){ 
        try{
            // role_bytes32 = web3.utils.padLeft(web3.utils.asciiToHex(role), 64);
            return await Contract.methods.register(currentAccount, rec_address, 1, 0).send({from:currentAccount});
        } 
        catch(e){
            success=0;
            console.log(e);
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    });    
}

function donate_money(donor_address, donationAmount){
    console.log("register_donor ");
    var success=1;
    var tmp = async function(){ 
        try{
            // role_bytes32 = web3.utils.padLeft(web3.utils.asciiToHex(role), 64);
            return await Contract.methods.makeDonation(currentAccount, donationAmount).send({from:currentAccount, value: donationAmount});
        } 
        catch(e){
            console.log(e)
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    });    
}

function unregister_donor(role){
    console.log("unregistering donor ");
    var success=1;
    var tmp = async function(){ 
        try{
            return await Contract.methods.unregister(currentAccount, role).send({from:currentAccount});
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    }); 
}

function makeDonation(amount){
    console.log("unregistering donor ");
    var success=1;
    var tmp = async function(){ 
        try{
            return await Contract.methods.makeDonation(currentAccount, amount).send({from:currentAccount, value: amount});
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    }); 
}


function transferTokens(id, amount) {
	console.log("transfer tokens");
    var success=1;
    var tmp = async function(){ 
        try{
            return await Contract.methods.transferTokens(id, amount).send({from:currentAccount});
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    }); 
}


function createClaim(amount, doc, desc, zip){
    console.log("Creating a Claim ");
    var success=1;
    var tmp = async function(){ 
        try{
            return await Contract.methods.createClaim(currentAccount, amount, doc, desc, zip).send({from:currentAccount});
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    }); 
}


// document.getElementById('fund_btn').addEventListener('click', () => {
//     const form = document.getElementById('total_funds_avail');
//     var success=1;

//     console.log("funds call")


//     var tmp = async function(){
//         try{
//             // role_bytes32 = web3.utils.padLeft(web3.utils.asciiToHex(role), 64);
//             var val = await Contract.methods.getFundsAvailable().call();
//             form.innerHTML = "Total funds available in reserve: " + val
//             console.log("sum: " + val + ", total claims: " + claims)
//         } 
//         catch(e){
//             success=0;
//             alert("Transaction failed");
//         }
//     }
//     tmp().then((val)=>{
//         console.log(val);
//         if(success==1){
//             alert("Success");
//         }
//     });

//     setTimeout(
//         function open(event){
//             document.querySelector(".popup").style.display = "block";
//         }, 2000
//     )
// });

function getClaimStatusStr(r) {
    if (r==0){
        return "Raised"
    } else if (r == 1) {
        return "Processing"
    } else if (r == 2) {
        return "Approved"
    } else if(r == 3) {
        return "Claimed"
    }
    return "Rejected"
}

function poupulateClaimsList() {
    console.log("poupulateClaimsList")
    flag = true
    for(let i=0;i<claims;i++) {
        console.log("claims loop: " + i);
        var claimsListFun = async function(){ 
            try{
                var val = await Contract.methods.accessParticularClaim(i).call()
                console.log(val)
                if(val["0"] == false){
                    console.log("not in claims")
                    flag_event = 0
                    claimsListFun.resolve()
                }else{

                    flag = false

                    var mainDiv = document.createElement("div")
                    mainDiv.className="box child is-centered is-half"

                    var s0 = document.createElement("span") 
                    s0.id = "claim_id_"+i
                    s0.className = "level-item"
                    s0.innerHTML = "Claim Id: " + i
                    mainDiv.appendChild(s0)
                    mainDiv.appendChild(document.createElement("br"))
    
                    var s1 = document.createElement("span") 
                    s1.id = "claim_address_"+i
                    s1.className = "level-item"
                    s1.innerHTML = "Claimer Address: " + val[1]
                    mainDiv.appendChild(s1)
                    mainDiv.appendChild(document.createElement("br"))
                    
    
                    var s2 = document.createElement("span")
                    s2.className = "level-item" 
                    s2.id = "claim_status_"+i
                    s2.innerHTML = "Claim Status: " + getClaimStatusStr(val[2])
                    mainDiv.append(s2)
                    mainDiv.appendChild(document.createElement("br"))
                    
                    
                    var s3 = document.createElement("span")
                    s3.className = "level-item" 
                    s3.id = "claim_amount_"+i
                    s3.innerHTML = "Requested Amount: " + (val[3])
                    mainDiv.appendChild(s3)
                    mainDiv.appendChild(document.createElement("br"))
                    
    
                    var s4 = document.createElement("span");
                    s4.id = "claimed_"+i
                    s4.className = "level-item"
                    s4.innerHTML = "Claimed: " + val[4];
                    mainDiv.appendChild(s4)
                    mainDiv.appendChild(document.createElement("br"))
                    
    
                    var s5 = document.createElement("span");
                    s5.innerHTML = "Doc: " + val[5];
                    mainDiv.appendChild(s5)
                    s5.className = "level-item"
                    mainDiv.appendChild(document.createElement("br"))
    
                    var s6 = document.createElement("span");
                    s6.innerHTML = "Zip: " + val[6];
                    s6.className = "level-item"
                    mainDiv.appendChild(s6)

                    mainDiv.appendChild(document.createElement("br"))
    
    
                    var mainSpan = document.createElement('span');
                    mainSpan.innerHTML = `<button class="btn btn-primary btn-sm" onclick="onClickProcess(${i})">Process `
                    mainSpan.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;`
                    mainSpan.innerHTML += `<button class="btn btn-success btn-sm" onclick="onClickAccept(${i})">Accept `
                    mainSpan.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;`
                    mainSpan.innerHTML += `<button class="btn btn-danger btn-sm" onclick="onClickReject(${i})">Reject `; 
                    mainSpan.className = "level-item"
                    mainDiv.append(mainSpan)
    
                    document.getElementById("claim_list").appendChild(mainDiv);
                }
            }
            catch(e){
                success=0;
                console.log("Transaction failed");
                return
            }
        }
        claimsListFun().then((val)=>{
            console.log(val);
            if(success==1){
                console.log("Success");
            }
        });
    }
    // console.log("dgfdfghjcvhjkl: " + flag)
    // if (flag == true) {
    //     document.getElementById("no_claims_text").style.display="block";
    // }
}

function onClickProcess(i) {
    console.log("onClickProcess, claim id: "+i)
    var success=1;
    var tmp = async function(){ 
        try{
            return await Contract.methods.processClaim(i).send({from:currentAccount, value: 100000000});
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    });
}

function onClickAccept(i) {
    console.log("onClickAccept: "+i)
    var success=1;
    var tmp = async function(){ 
        try{
            return await Contract.methods.acceptClaim(i).send({from:currentAccount, value: 100000000});
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    });
}


function onClickReject(i) {
    console.log("onClickReject: "+i)
    var success=1;
    var tmp = async function(){ 
        try{
            return await Contract.methods.rejectClaim(i).send({from:currentAccount, value: 100000000});
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    });
}


function onClickClaim(i) {
    console.log("onClickClaim: "+i)
    var success=1;
    var tmp = async function(){ 
        try{
            return await Contract.methods.claimTheClaim(i).send({from:currentAccount, value: 100000000});
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    });
}




function poupulateRecipientsClaimsList() {
    console.log("poupulateRecipientsClaimsList: " + String(currentAccount).toLowerCase());
    flag = true
    for(let i=0;i<claims;i++) {
        console.log("Recipients claims loop: " + i);
        var claimsListFun = async function(){ 
            try{
                var val = await Contract.methods.accessParticularClaim(i).call()
                console.log(val)
                if(val["0"] == false){
                    console.log("not in claims")
                    claimsListFun.resolve()
                }else{
                    console.log("Recipients claims loop inside if: " + val[1]);
                    console.log("Recipients claims loop inside if cur: " + currentAccount);
                    if (val["1"].toLowerCase() == String(currentAccount).toLowerCase()) {

                        var mainDiv = document.createElement("div")
                        mainDiv.className="box child is-centered is-half"

                        var s0 = document.createElement("span") 
                        s0.id = "claim_id_"+i
                        s0.className = "level-item"
                        s0.innerHTML = "Claim Id: " + i
                        mainDiv.appendChild(s0)
                        mainDiv.appendChild(document.createElement("br"))
                        

                        var s1 = document.createElement("span") 
                        s1.id = "claim_address_"+i
                        s1.className = "level-item"
                        s1.innerHTML = "Claimer Address: " + val[1]
                        mainDiv.appendChild(s1)
                        mainDiv.appendChild(document.createElement("br"))
                        
        
                        var s2 = document.createElement("span")
                        s2.className = "level-item" 
                        s2.id = "claim_status_"+i
                        s2.innerHTML = "Claim Status: " + getClaimStatusStr(val[2])
                        mainDiv.append(s2)
                        mainDiv.appendChild(document.createElement("br"))
                        
                        
                        var s3 = document.createElement("span")
                        s3.className = "level-item" 
                        s3.id = "claim_amount_"+i
                        s3.innerHTML = "Requested Amount: " + (val[3])
                        mainDiv.appendChild(s3)
                        mainDiv.appendChild(document.createElement("br"))
                        
        
                        var s4 = document.createElement("span");
                        s4.id = "claimed_"+i
                        s4.className = "level-item"
                        s4.innerHTML = "Claimed: " + val[4];
                        mainDiv.appendChild(s4)
                        mainDiv.appendChild(document.createElement("br"))
                        
        
                        var s5 = document.createElement("span");
                        s5.innerHTML = "Doc: " + val[5];
                        mainDiv.appendChild(s5)
                        s5.className = "level-item"
                        mainDiv.appendChild(document.createElement("br"))
        
                        var s6 = document.createElement("span");
                        s6.innerHTML = "Zip: " + val[6];
                        s6.className = "level-item"
                        mainDiv.appendChild(s6)
                        mainDiv.appendChild(document.createElement("br"))
        
        
                        var mainSpan = document.createElement('span');
                        mainSpan.innerHTML = `<button class="btn btn-success btn-sm" onclick="onClickClaim(${i})">Claim Funds `; 
                        mainSpan.className = "level-item"
                        mainDiv.append(mainSpan)
        
                        document.getElementById("claim_list").appendChild(mainDiv);
                    }
                }
            }
            catch(e){
                success=0;
                console.log("Transaction failed");
                return
            }
        }
        claimsListFun().then((val)=>{
            console.log(val);
            if(success==1){
                console.log("Transaction Success");
            }
        });
    }
    // console.log("dgfdfghjcvhjkl: " + flag)
    // if (flag == true) {
    //     document.getElementById("no_claims_text").style.display="block";
    // }
}


setTimeout(
	function open(event){
		console.log("isRewarded: " + isRewarded);
		if (isRewarded) {
			document.querySelector("#airdrop").className = "btn btn-info" + " disabled";
		} 
		else {
			document.querySelector("#airdrop").className = "btn btn-info";
		}
        document.querySelector("#airdrop").style.display = "block";
	}, 2000
)











