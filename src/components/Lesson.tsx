import classNames from "classnames";
import { isPast, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  slug: string;
  title: string;
  availableAt: Date;
  type: "class" | "live";
}

const Lesson: React.FC<LessonProps> = ({ title, availableAt, type, slug }) => {
  const typeText = type === "live" ? "AO VIVO" : "AULA PRÁTICA";
  const lessonIsAvailable = isPast(availableAt)
  const availableAtText = format(availableAt, "EEEE' • ' d ' de ' MMMM' ' • ' 'k'h'mm",{
    locale: ptBR
  })
  const {slug: slugInParams} = useParams<{slug: string}>()

  const isActive = slugInParams === slug

  return (
    <Link  className="flex flex-col group" to={`/event/lesson/${slug}`} >
      <span className="text-gray-300">{availableAtText}</span>
      <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors',
        {
          'bg-green-500': isActive,
        }
      )}>
        <header className="flex items-center justify-between">
          {lessonIsAvailable ? (
            <span className={classNames('text-sm font-medium flex gap-2 items-center',{
              'text-white': isActive,
              'text-blue-500 ': !isActive,
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className={classNames('text-sm text-orange-500 font-medium flex gap-2 items-center')}>
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classNames('text-xs rounded px-2 py-[2px] text-white border border-green-300 font-bold')}>
            {typeText}
          </span>
        </header>
        <strong className={classNames('mt-5 block',{
          'white': isActive,
          'text-gray-200': !isActive
        })}>{title}</strong>
      </div>
    </Link>
  );
};

export default Lesson;
