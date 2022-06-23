import { isPast, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle, Lock } from "phosphor-react";
import { Link } from "react-router-dom";

interface LessonProps {
  slug: string;
  title: string;
  availableAt: Date;
  type: "class" | "live";
}

const Lesson: React.FC<LessonProps> = ({ title, availableAt, type, slug }) => {
  const typeText = type === "live" ? "AO VIVO" : "AULA PRÁTICA";
  const now = new Date();
//   const lessonIsAvailable = true
  const lessonIsAvailable = isPast(availableAt)
  const availableAtText = format(availableAt, "EEEE' • ' d ' de ' MMMM' ' • ' 'k'h'mm",{
    locale: ptBR
  })

  return (
    <Link  className="flex flex-col group" to={`/event/lesson/${slug}`} >
      <span className="text-gray-300">{availableAtText}</span>
      <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors">
        <header className="flex items-center justify-between">
          {lessonIsAvailable ? (
            <span className="text-sm text-blue-500 font-medium flex gap-2 items-center ">
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex gap-2 items-center ">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className="text-xs rounded px-2 py-[2px] text-white border border-green-300 font-bold">
            {typeText}
          </span>
        </header>
        <strong className="text-gray-200 mt-5 block">{title}</strong>
      </div>
    </Link>
  );
};

export default Lesson;
