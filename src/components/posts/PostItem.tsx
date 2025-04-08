import { PostType } from "../../types";

interface itemsType {
  items: PostType;
}

function PostItem({ items }: itemsType) {
  return (
    <div className="mt-3 h-80 border-1">
      <div className="image-container flex w-full h-60 border-b-1">
        <img src={items.thumbnail} className="w-full h-full border-0" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="pl-3 pt-3">{items.title}</div>
        <div className="pl-3 ">{items.subTitle}</div>
      </div>
    </div>
  );
}

export default PostItem;
