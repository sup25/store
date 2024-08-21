import { ProfileDetails } from "./profileDetails";
import { AddressDetails } from "./addressDetails";
import { RegistrationTime } from "./registrationTime";
import SendVerificationEmail from "./email/SendVerificationEmail";
import SendPhoneVerificationCode from "./phone/sendPhoneVerificationCode";

const Userdata = () => {
  return (
    <div className="py-10  w-full max-w-[400px] h-fit bg-slate-300">
      <div className="flex flex-col items-center gap-3 mb-4 w-full ">
        <ProfileDetails />
        <div className="px-5 w-full flex flex-col items-start gap-3">
          <AddressDetails />
          <RegistrationTime />
          <SendVerificationEmail />
          <SendPhoneVerificationCode />
        </div>
      </div>
    </div>
  );
};

export default Userdata;
