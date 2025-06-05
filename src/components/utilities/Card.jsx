const Card = ({text}) => {
  return (
      <div className="absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[12rem] cursor-grab">{text}</div>
  )
}

export default Card;