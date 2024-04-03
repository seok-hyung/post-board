'use client';
import Link from 'next/link';

const ListItem = ({ result }: ListItemProps) => {
  // useEffect 안에는 db를 직접 조작할 수 있는 코드는 넣지 못하게 되어있음
  // client componets에 짠 코드는 모두 유저 브라우져에 전달되기 떄문이다
  // 서버에 부탁하는 식으로 코드를 작성해야한다.

  // useEffect의 실행시점은 HTML을 전부 랜더링한 이후이다.
  // 1. 텅 빈 HTML, 2. useEffect 실행 3.HTML에 DB 내용 채워줌, 완성된 페이지
  // 이게 왜 문제냐면, 페이지를 방문하는게 유저뿐만 아니라 검색엔진 봇들도 방문하기 떄문임
  // 검색엔진 봇들이 페이지 방문시 텅빈 HTML이기 때문에 이 페이지의 정보를 수집하지 못함
  // 그러면 어떻게 해야 할까?
  // 부모 컴포넌트인 List(서버 컴포넌트)에서 DB 내용을 받아서 props로 자식 컴포넌트인 ListItem(클라이언트 컴포넌트)에 전달해주면 HTML에 DB내용을 미리 채워서 보내주고, 문제가 해결된다.

  return (
    <>
      {result.map((data: Post, index: number) => (
        <div className="list-item" key={index}>
          <Link href={`/detail/${data._id}`}>
            <h4>{data.title}</h4>
          </Link>
          <Link href={`/edit/${data._id}`} className="list-btn">
            ✏️
          </Link>
          {/* form 태그 말고도 서버에 get,post 요청을 보낼 수 있는 기능 AJAX */}
          {/* form으로 요청시 항상 새로고침 but Ajax로 요청시 새로고침 X */}
          <span
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              fetch('/api/post/delete', {
                method: 'POST', // Method DELETE => POST 로 바꾸고 에러해결

                body: JSON.stringify({ postId: data._id }),
                // body: data._id,
              })
                .then((r) => r.json())
                .then((res) => {
                  //성공시 실행할코드
                  const target = e.target as HTMLElement; // HTMLElement로 타입 단언
                  target.parentElement!.style.opacity = '0';
                  setTimeout(() => {
                    target.parentElement!.style.display = 'none';
                  }, 1000);
                  console.log('ListItem fetch 정상작동', res);
                })
                .catch((error) => {
                  //인터넷문제 등으로 실패시 실행할코드
                  console.log('에러는 :', error);
                });
            }}
          >
            🗑️
          </span>
          <p>{data.content}</p>
        </div>
      ))}
    </>
  );
};

export default ListItem;

interface Post {
  content: string;
  _id: string;
  title: string;
}
type ListItemProps = {
  result: Post[];
};
