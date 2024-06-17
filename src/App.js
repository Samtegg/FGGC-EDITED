import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Dashboard from "./routes/Dashboard";
import Faq from "./routes/Faq";
import Recoverypg from "./routes/Recoverypg";
import Activate from "./components/dashboard/activate/Activate";
import Makepayment from "./components/dashboard/makepayment/Makepayment";
import Userdetails from "./components/dashboard/userdetails/Userdetails";
import Paymentconfirmed from "./components/dashboard/paymentconfirmed/Paymentconfirmed";
import Payoutportal from "./components/dashboard/payoutportal/Payoutportal";
import Receivedportal from "./components/dashboard/receivedportal/Receivedportal";
import Forgotpassword from "./components/sign/forgotpassword/Forgotpassword";
import Resetpassword from "./components/sign/resetpassword/Resetpassword";
import Notification from "./components/dashboard/notification/Notification";
import Profileupdate from "./components/dashboard/profileupdate/Profileupdate";
import Changepassword from "./components/dashboard/profileupdate/changepassword/Changepassword";
import Timeout from "./components/dashboard/timeout/Timeout";
import Advertmoney from "./components/dashboard/advertmoney/Advertmoney";
import Accountupdate from "./components/dashboard/accountupdate/Accountupdate";
import Paymentpending from "./components/dashboard/paymentpending/Paymentpending";
import Genealogy from "./components/dashboard/genealogy/Genealogy";
import Terms from "./components/homepage/terms/Terms";
import Paymentapproval from "./components/dashboard/paymentapproval/Paymentapproval";
import Supportticket from "./components/dashboard/supportticket/Supportticket";
import Constitution from "./components/dashboard/constitution/Constitution";
import Genealogyinfo from "./components/dashboard/genealogy/Genealogyinfo";
import InputData from "./components/InputData";

import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

import { ToastContainer } from 'react-toastify';
//custom packages css
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { token, login, logout, userId } = useAuth();

  const istokenLocal = JSON.parse(localStorage.getItem('userData'));

  let routes;

  if (token || istokenLocal?.token) {
        
    routes = (
        <>
            <Route path="/dashboard" element= {<Dashboard />} />
            <Route path="/dashboard/makepayment" exact element= {<Makepayment />} />
            {/* <Route path="/dashboard/makepayment/subscription" exact element= {<Makepayment />} /> */}
            <Route path="/dashboard/makepayment/userdetails" element= {<Userdetails />} />
            <Route path="/dashboard/makepayment/userdetails/paymentpending" element= {<Paymentpending />} />
            <Route path="/dashboard/paymentconfirmed" element= {<Paymentconfirmed />} />
            <Route path="/dashboard/payoutportal" element= {<Payoutportal />} />
            <Route path="/dashboard/receivedportal" element={<Receivedportal />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/dashboard/profileupdate" element={<Profileupdate />} />
            <Route path="/dashboard/profileupdate/changepassword" element={<Changepassword />} />
            <Route path="/dashboard/timeout" element={<Timeout />} />
            <Route path="/dashboard/advertmoney" element={<Advertmoney />} />
            <Route path="/dashboard/accountupdate" element={<Accountupdate />} />
            <Route path="/dashboard/genealogy" element={<Genealogy />} />
            <Route path="/dashboard/genealogy/userinfo/:id" element={<Genealogyinfo />} />
            <Route path="/dashboard/paymentapproval" element={<Paymentapproval/>} />
            <Route path="/dashboard/constitution" element={<Constitution/>} />
            <Route path="/components/InputData" element={<InputData/>} />  
            <Route path="/signup/recovery" element= {<Recoverypg />} />
            <Route path="/activate" element= {<Activate />} />  
            <Route path="/activate/:id" element= {<Activate />} />   
            <Route path="*" element={<Navigate to ="/dashboard" replace/>}/>

        </>
    );
  } else {
        routes = (
            <>
              <Route path="/" element= {<Home />} />
              <Route path="/FAQ" element= {<Faq />} />
              <Route path="/supportticket" element={<Supportticket />} />       
              <Route path="signup" element= {<SignUp />} />
              <Route path="/termsandcondition" element= {<Terms />} />
              <Route path="/signin" element= {<SignIn />} />
              <Route path="/forgotpassword" element={<Forgotpassword />} />
              <Route path="/resetpassword" element={<Resetpassword />} />        
              <Route path="/components/InputData" element={<InputData/>} />
              <Route path="*" element={<Navigate to ="/" replace/>}/>     
            </>
        );
    }
    
  return (
    
      <>
      <ToastContainer />
      <AuthContext.Provider
            value={{
            isLoggedIn: !!token,
            token: token !== false ? token : istokenLocal?.token,
            userId: userId,
            login: login,
            logout: logout
        }}>
        <Router>
          <Routes>
          {routes}
          </Routes>
        </Router>
      </AuthContext.Provider>
      </>
    
  );
}

export default App;
