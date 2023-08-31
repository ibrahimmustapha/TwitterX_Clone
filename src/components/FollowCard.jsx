const FollowCard = (props) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex gap-4 items-center">
        <img
          className="w-12 rounded-full"
          src={props.image}
          alt="profile_img"
        />
        <div>
          <div>{props.name}</div>
          <div className="text-sm font-semibold">{props.username}</div>
        </div>
      </div>
      <div className="bg-white text-black text-sm px-4 py-2 rounded-full font-semibold">Follow</div>
    </div>
  );
};

export default FollowCard;
