const ShangriLaCompany = () => {
  const iframeUrl = "https://shangri-la-d8n9cmz.gamma.site/";

  return (
    <div className="w-full h-screen">
      <iframe 
        src={iframeUrl}
        className="w-full h-full border-none"
        title="Shangri-La Company"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default ShangriLaCompany;
