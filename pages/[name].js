//This is a dynamic route
//If someone goes to /jacob, it would load this component and [name] will be set to jacob
//How do we access this name? with useRouter
import {useRouter} from 'next/router';

const Name = () => {
  const router = useRouter();
  const query = router.query;
  const name = query.name;
  console.log(query);


  return(
    <div>
      <p>This is dynamic</p>
      <h1>
      Hello {name}
      </h1>
    </div>
  )
}

export default Name;