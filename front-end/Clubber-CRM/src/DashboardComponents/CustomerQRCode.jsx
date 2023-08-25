import React from "react";
import QRCode from "qrcode.react";

const CustomerQRCode = (props) => {
  return (
    <div>
      <QRCode value={props.memberId} />
    </div>
  );
};

export default CustomerQRCode;
