function UploadEbookPage() {
  return (
    <div className="pt-24">
      <p>UploadEbookPage</p>
      <form action="/api/upload" method="POST" encType="multipart/form-data">
        <input type="file" name="pdfFile" />
        <input type="submit" value="upload" />
      </form>
    </div>
  );
}
export default UploadEbookPage;
