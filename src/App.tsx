import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "./lib/apollo";

const GET_QUERY_LESSONS = gql`
  query {
    lessons {
      id
      title
    }
  }
`;

interface ILessons {
  id: string
  title: string
}

function App() {
  const {data} = useQuery<{lessons: ILessons[]}>(GET_QUERY_LESSONS)
  // const [lessons, setLessons] = useState([]);

  // const getLessons = async () => {
  //   try {
  //     const res = await client.query({
  //       query: GET_QUERY_LESSONS,
  //     });
  //     const data = res.data;
  //     console.log("data -->", data);

  //     setLessons(data.lessons);
  //   } catch (e) {
  //     console.log("error -->", e.message);
  //   }
  // };

  // console.log("lessons -->", lessons);

  // useEffect(() => {
  //   getLessons();
  // }, []);

  return (
    <div className="min-h-screen grid place-items-center  ">
      <ul>
        {data?.lessons.map((item, index) => {
          return (
            <li key={index}>{item.title}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
