import { gql, useQuery } from "@apollo/client";
import Lesson from "./Lesson";

const GET_LESSONS = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      slug
      title
      availableAt
    }
  }
`;

interface LessonType {
  id: string;
  lessonType: 'live' | 'class';
  slug: string;
  title: string;
  availableAt: string;
}

interface LessonsResponse {
  lessons: LessonType[];
}

const Sidebar = () => {
  const { data, error } = useQuery<LessonsResponse>(GET_LESSONS);

  const lessons = data?.lessons || [];

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {lessons.length > 0 &&
          lessons.map((item) => {
            return (
              <Lesson
                key={item.id}
                title={item.title}
                slug={item.slug}
                availableAt={new Date(item.availableAt)}
                type={item.lessonType}
              />
            );
          })}
        {/* <Lesson
          title={"Aula 1"}
          slug={"aula-1"}
          availableAt={new Date("2022-6-20")}
          type={"class"}
        />
        <Lesson
          title={"Aula 2"}
          slug={"aula-2"}
          availableAt={new Date("2022-6-24")}
          type={"live"}
        /> */}
      </div>
    </aside>
  );
};

export default Sidebar;
