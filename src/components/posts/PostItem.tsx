import { PostType } from "../../types";

interface itemsType {
  items: PostType;
}

function PostItem({ items }: itemsType) {
  return (
    <>
      <div className="mt-3 h-80 border-1">
        <div className="image-container flex w-full h-60 border-b-1">
          <img
            src={items.thumbnail || "/images/default-thumbnail.png"}
            className="w-full h-full border-0 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="pl-3 pt-3">
            <span className="cursor-pointer">{items.title}</span>
          </div>
          <div className="pl-3">
            <span className="cursor-pointer">{items.subTitle}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostItem;
