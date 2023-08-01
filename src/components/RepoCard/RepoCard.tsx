import Card from '../../UI/Card/Card';

export type RepoCardProps = {
  item: {
    name: string;
    html_url: string;
    forks: string;
    owner?: { login: string };
  };
};

function RepoCard({ item }: RepoCardProps) {
  const bodyContent = (
    <>
      <p>name: {item.name}</p>
      <p>
        url: <a href={item.html_url}> {item.html_url}</a>
      </p>
      <p>author: {item.owner?.login}</p>
      <p>forks: {item.forks}</p>
    </>
  );
  return <Card bodyContent={bodyContent} height={300} />;
}

export default RepoCard;
