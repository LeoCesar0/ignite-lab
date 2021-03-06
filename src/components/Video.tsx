import { DefaultUi, Player, Youtube } from "@vime/react";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from "phosphor-react";

import "@vime/core/themes/default.css";
import { useGetLessonBySlugQuery } from "../graphql/generated";

const Video: React.FC<{ slug: string }> = ({ slug }) => {
  const { data, error } = useGetLessonBySlugQuery({
    variables: {
      slug: slug,
    },
    // fetchPolicy: "no-cache",
  });

  if (!data || !data.lesson) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    );
  }

  const lesson = data.lesson;

  return (
    <section className="flex-1">
      <div className="bg-black grid place-items-center">
        <div className="w-full h-full aspect-video max-w-[1100px] max-h-[60vh]">
          <Player key={lesson.videoId} >
            <Youtube videoId={lesson.videoId || ""} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 mx-auto max-w-[1100px]">
        <div className="flex items-start gap-16">
          <div className="flex-1 ">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed ">
              {lesson.description}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {lesson.teacher && (
                <>
                  <img
                    src={lesson.teacher.avatarURL}
                    alt="Leonardo César"
                    className="h-16 w-16 rounded-full border-blue-500"
                  />
                  <div>
                    <strong className="font-bold text-2xl block">
                      {lesson.teacher.name}
                    </strong>
                    <span className="text-gray-200 text-sm block">
                      {lesson.teacher.bio}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a className="p-4 text-sm bg-green-500 flex justify-center items-center rounded font-bold uppercase gap-2 hover:bg-green-700 transition-colors">
              <DiscordLogo size={24} />
              Comunidade do discord
            </a>
            <a className="p-4 text-sm border border-blue-500 text-blue-500 flex justify-center items-center rounded font-bold uppercase gap-2 hover:bg-blue-500 hover:text-gray-900 transition-colors">
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        {/* BOTTOM_CARDS_CONTAINER */}
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desempenho
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center ">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Video;
