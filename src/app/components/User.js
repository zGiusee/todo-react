import Image from "next/image";
export default function User({ user }) {
  return (
    <div className=" flex items-center">
      <img className="rounded-full" src={getImageUrl(image)} />
      <span className="mx-2 text-sm">Benvenuto {toUP(name)}!</span>
      <span className="">({id})</span>
    </div>
  );
}

// ! FUNZIONE PER CONTROLLARE LE IMMAGINI DEGLI UTENTI
const defaultImage = "https://placehold.jp/202020/ffffff/32x32.png?text=User";
function getImageUrl(imageURL) {
  try {
    new URL(imageURL);
    return imageURL;
  } catch {
    return defaultImage;
  }
}
