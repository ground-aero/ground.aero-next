// dinamic routes
export default function LibraryDetails({ 
  params,
}: { 
  params: { itemId: string }
}) {
    return (
    <div>
      <p></p>
      <p></p>
      <h1>Slug for Library/SGHA2018. Details $ ${params.itemId}</h1>
      <p>This is a slug for Library</p>
    </div>
  );

}