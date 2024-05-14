import Image from "next/image";

export default function User({ user }) {
  return (
    <div className=" py-8 px-5 flex items-center">
      <img className="rounded-full" src={getImageUrl(user.image)} />
      <span className="mx-2 text-sm">Benvenuto {user.name}!</span>
      <span className="">({user.id})</span>
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
