import Footer from "./Footer";
import React from "react";

export default function({ children }){
    return(
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
    );
}