const BIMCompany = () => {
  const iframeUrl = "https://bim-9azfqw3.gamma.site/";

  return (
    <div className="w-full h-screen">
      <iframe 
        src={iframeUrl}
        className="w-full h-full border-none"
        title="BIM Company"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default BIMCompany;