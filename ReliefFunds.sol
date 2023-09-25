// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "./ERC20.sol";

contract ReleifFunds is ERC20 {

    uint256 public totalFunds;
    address public admin;
    mapping(address => Donor) public donatorsList;
    mapping(address => Recipient) public recipientsList;
    uint256 public claim_id = 1;
    mapping(uint256 => Claim) public claimsList;
    mapping(address => bool) public isRewarded;


    constructor () ERC20("Releif Fund", "RELIVES") {
        _mint(msg.sender, 10000000 * 10 ** 18);
        admin = msg.sender;
        isRewarded[admin] = true;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier onlyAdminOrDonor() {
        require(msg.sender == admin || donatorsList[msg.sender].registered == true);
        _;
    }

    modifier onlyNewUser(address _addr) {
        require(isRewarded[_addr] != true);
        _;
    }

    modifier onlyParticularRecipient(address _addr, uint256 clid) {
        require(_addr == claimsList[clid].id);
        require(recipientsList[_addr].registered == true);
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    struct Recipient{
        string name;
        bool registered;
        uint256[] clids;
    }
    
    struct Donor{
        string name;
        bool registered;
        uint256 amount;
    }

    struct Claim{
        uint256 cId;
        address id;
        claimStatus status;
        uint requestedAmount;
        bool claimed;
        string documentId;
        string description;
        uint256 zipcode;
    }
    
    enum claimStatus {Raised, Processing, Approved, Claimed, Rejected}

    enum Roles {donor, recipient}

    function isTokensClaimed(address id) public view returns(bool) {
        if (isRewarded[id] == true) {
            return true;
        }
        return false;
    }

    function claimNewUserTokens(address id) public onlyNewUser(id) {
        isRewarded[id] = true;
        _transfer(admin, id, 20 * 10 ** 18);
    }

    function createClaim(address id, uint amount, string memory docId, string memory description, uint256 zip) public payable{
        require(recipientsList[id].registered == true, "You must be registered recipient to crete a claim.");
        require(totalFunds >= amount, "We donot have enough funds for your claim, check with us back later.");
        recipientsList[id].clids.push(claim_id);
        claimsList[claim_id].cId = claim_id;
        claimsList[claim_id].id = id;
        claimsList[claim_id].claimed = false;
        claimsList[claim_id].status = claimStatus.Raised;
        claimsList[claim_id].documentId = docId;
        claimsList[claim_id].description = description;
        claimsList[claim_id].zipcode = zip;
        claimsList[claim_id].requestedAmount = amount;
        claim_id++;
    }

    function register(address id, string memory name, uint role, uint donationAmount) public payable returns(bool) {
        bool sent = payable(address(this)).send(msg.value);
        if(Roles(role) == Roles.donor){
            uint tokens = donationAmount;
            require(donationAmount > 0, "There should be minimum donation amount!");
            require(recipientsList[id].registered != true);
            // if (donationAmount > 1000) {
            //     tokens = 100;
            // } else if (donationAmount >= 10000) {
            //     tokens = 200;
            // } else if (donationAmount >= 100000) {
            //     tokens = 500;
            // } else if (donationAmount >= 1000000) {
            //     tokens = 1000;
            // } else if (donationAmount >= 2000000) {
            //     tokens = 2000;
            // } else if (donationAmount >= 10000000) {
            //     tokens = 5000;
            // }
            _transfer(admin, id , tokens * 10 ** 18);
            donatorsList[id].name = name;
            donatorsList[id].registered=true;
            donatorsList[id].amount = donationAmount;
            totalFunds += donationAmount;
        }
        else if(Roles(role) == Roles.recipient){
            require(donatorsList[id].registered != true);
            recipientsList[id].registered = true;
            recipientsList[id].name = name;
        }
        return sent;
    }

    function unregister(address id, uint role) public {
        if(Roles(role) == Roles.donor){
            donatorsList[id].registered=false;
        }
        else if(Roles(role)==Roles.recipient){
            recipientsList[id].registered = false;
        }
        _transfer(id, admin, balanceOf(id) * 10 ** 18);
    }

    function makeDonation(address id, uint amount) public payable returns(bool) {
        bool sent = payable(address(this)).send(msg.value);
        require(amount > 0, "There should be minimum donation amount!");
        _transfer(admin, id, amount * 10 ** 18);
        if (donatorsList[id].registered != true) {
            donatorsList[id].registered=true;
        }
        donatorsList[id].amount += amount;
        totalFunds += amount;
        return sent;
    }

    function getFundsAvailable() public view returns(uint256) {
        return (totalFunds);
    }

    function getTotalClaims() public view returns(uint256) {
        return (claim_id);
    }

    function accessParticularClaim(uint256 cid) public view returns(bool, address, uint, uint, bool, string memory, uint256) {
        if (claimsList[cid].cId == 0) {
            return (false, 0x0000000000000000000000000000000000000000, 0, 0, false, "", 0);
        }
        return (true, claimsList[cid].id, uint(claimsList[cid].status), claimsList[cid].requestedAmount, claimsList[cid].claimed, claimsList[cid].documentId, claimsList[cid].zipcode);
    }

    function getClaimsIds(address id) public view returns(uint256[] memory) {
        require(recipientsList[id].registered == true, "You are not a registered recipient.");
        return (recipientsList[id].clids);
    }

    function processClaim(uint256 clid) public onlyAdminOrDonor validAddress(msg.sender) payable {
        require(claimsList[clid].status == claimStatus.Raised);
        require(balanceOf(msg.sender) > 1000 * 10 ** 18, "Donor must have atleast 1000 tokens to start processing of a claim");
        claimsList[clid].status = claimStatus.Processing;
        _transfer(admin, msg.sender, 20 * 10 ** 18);
    }

    function acceptClaim(uint256 clid) public onlyAdmin payable {
        require(claimsList[clid].status == claimStatus.Processing);
        claimsList[clid].status = claimStatus.Approved;
    }

    function rejectClaim(uint256 clid) public onlyAdmin payable {
        require(claimsList[clid].status == claimStatus.Processing || claimsList[clid].status == claimStatus.Raised);
        claimsList[clid].status = claimStatus.Rejected;
    }

    function claimTheClaim(uint256 clid) public {
        require(claimsList[clid].status == claimStatus.Approved, "xyz");
        require(totalFunds >= claimsList[clid].requestedAmount, "We donot have enough funds for your request, Check with us back later");
        claimsList[clid].status = claimStatus.Claimed;
        totalFunds -= claimsList[clid].requestedAmount;
    }

    function transferTokens(address id, uint256 tokens) public {
        require(balanceOf(msg.sender) >= tokens * 10 ** 18, "YOu donot have enough tokens");
        _transfer(msg.sender, id, tokens * 10 ** 18);
    }

}