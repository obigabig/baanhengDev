
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const Contact = require('../controllers/contract');

module.exports = (app, requireAuth) => {
    /* New contract */
    app.post("/api/create-contract", requireAuth, Contact.createContract);
    app.get("/api/initialContractForm", requireAuth, Contact.initialContractForm);
    /* Edit contract */
    app.get("/api/getContract/:id", requireAuth, Contact.getContract);    
    app.post("/api/update-contract", requireAuth, Contact.updateContract);
    /* Delete contract */
    app.get("/api/deleteContract/:id", requireAuth, Contact.deleteContract);  
    /* Contract list */
    app.get("/api/ContractLists", requireAuth, Contact.getContractLists);
    app.get("/api/getContractListsLength", requireAuth, Contact.getContractListsLength);
    /* Dashboard */
     app.get("/api/getDueContractLists", requireAuth, Contact.getDueContractLists);
     app.get("/api/markActionAsComplete", requireAuth, Contact.markActionAsComplete);
    /* Report */
    app.get("/api/getInvestorRatio", requireAuth, Contact.getInvestorRatio);
};