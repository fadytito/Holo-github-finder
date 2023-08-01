import Card from '../../UI/Card/Card';

export type UserCardProps = {
  item: { login: string; avatar_url: string; html_url: string; score: string };
};

function UserCard({ item }: UserCardProps) {
  const headerContent = <img src={item.avatar_url} alt={item.login} />;
  const bodyContent = (
    <>
      <p>name: {item.login}</p>
      <p>url: {item.html_url}</p>
      <p>score: {item.score}</p>
    </>
  );

  return <Card headerContent={headerContent} bodyContent={bodyContent} />;
}

export default UserCard;
