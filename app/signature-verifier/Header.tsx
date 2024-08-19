const Header = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold hidden sm:flex">
        Signature verifier
      </h1>
      <p>
        Verify if a Bitcoin signature is valid or not. Just enter an address,
        the message and the signature.
      </p>
    </div>
  );
};

export default Header;
