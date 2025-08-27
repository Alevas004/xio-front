"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FiHeart,
  FiTarget,
  FiUsers,
  FiStar,
  FiTrendingUp,
  FiShield,
  FiGlobe,
  FiUser,
  FiMail,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";

const AboutUs = () => {
  const values = [
    {
      icon: FiHeart,
      title: "Pasión por el bienestar",
      description:
        "Creemos que cada persona merece vivir en armonía consigo misma y con su entorno.",
    },
    {
      icon: FiShield,
      title: "Calidad garantizada",
      description:
        "Seleccionamos cuidadosamente cada producto para asegurar la más alta calidad.",
    },
    {
      icon: FiUsers,
      title: "Comunidad conectada",
      description:
        "Construimos una red de personas comprometidas con su crecimiento personal.",
    },
    {
      icon: FiGlobe,
      title: "Impacto positivo",
      description:
        "Buscamos generar un cambio positivo en la vida de nuestros clientes y el planeta.",
    },
  ];

  const stats = [
    {
      number: "2000+",
      label: "Clientes satisfechos",
      icon: FiUsers,
    },
    {
      number: "20+",
      label: "Productos únicos",
      icon: FiStar,
    },
    {
      number: "98%",
      label: "Satisfacción del cliente",
      icon: FiHeart,
    },
    {
      number: "24/7",
      label: "Soporte disponible",
      icon: FiShield,
    },
  ];

  const team = [
    {
      name: "Xiomara Sánchez",
      role: "Fundadora",
      image: "/xiomara.webp",
      description:
        "Terapeuta certificada con más de 10 años de experiencia en bienestar integral.",
      social: {
        linkedin: "#",
        instagram:
          "https://www.instagram.com/xiomarasanchezterapeuta?igsh=MWJwNmVlbjlrcWEwbQ==",
        email: "xiosanchezinfo@gmail.com",
      },
    },
    {
      name: "Alejandro Vasquez",
      role: "CEO",
      image: "/api/placeholder/300/300",
      description:
        "Experto en estrategia empresarial y desarrollo de productos.",
      social: {
        linkedin: "https://www.linkedin.com/in/alejandro-vasquez-8bb97b369",
        instagram: "#",
        email: "aleinfocontent@gmail.com",
      },
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Fundación de ByXio",
      description:
        "Comenzamos con la visión de democratizar el acceso al bienestar integral.",
    },
    {
      year: "2020",
      title: "Primera línea de productos",
      description:
        "Lanzamos nuestra colección inicial de productos para relajación y meditación.",
    },
    {
      year: "2022",
      title: "Expansión digital",
      description:
        "Creamos nuestra plataforma online para llegar a más personas en Colombia.",
    },
    {
      year: "2023",
      title: "Comunidad ByXio",
      description:
        "Más de 5,000 personas se unieron a nuestra comunidad de bienestar.",
    },
    {
      year: "2024",
      title: "Reconocimiento nacional",
      description:
        "Fuimos reconocidos como la mejor startup de bienestar en Colombia.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-piel-blanco via-white to-piel-claro/30">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-verde-oscuro/5 to-piel-oscuro/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-verde-claro/10 to-piel-claro/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-piel-oscuro/10 to-verde-gris/10 rounded-full translate-y-32 -translate-x-32"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-verde-oscuro mb-6">
              Nuestra Historia
            </h1>
            <p className="text-verde-oscuro max-w-3xl mx-auto leading-relaxed md:text-xl">
              En ByXio creemos que el bienestar no es un lujo, sino un derecho.
              Desde 2019, hemos dedicado nuestra pasión a crear experiencias que
              nutran el cuerpo, la mente y el espíritu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg flex flex-col justify-center items-center">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-verde-oscuro to-verde-claro rounded-xl">
                    <FiTarget className="w-6 h-6 text-verde-claro" />
                  </div>
                  <h3 className="text-2xl font-bold text-verde-oscuro">
                    Nuestra Misión
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Inspirar y acompañar a las personas en su journey hacia el
                  bienestar integral, ofreciendo productos y experiencias que
                  fomenten la conexión consigo mismas y con su entorno natural.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg flex flex-col justify-center items-center">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-piel-oscuro to-piel-claro rounded-xl">
                    <FiTrendingUp className="w-6 h-6 text-verde-claro" />
                  </div>
                  <h3 className="text-2xl font-bold text-verde-oscuro">
                    Nuestra Visión
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Ser la plataforma líder en Latinoamérica que conecte a las
                  personas con productos y experiencias auténticas de bienestar,
                  creando una comunidad global de individuos conscientes y
                  empoderados.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-verde-oscuro to-verde-claro rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative">
                  <h3 className="text-3xl font-bold">Lo que nos mueve</h3>
                  <div className="space-y-4 mt-3 flex flex-col items-start justify-start">
                    <div className="flex items-start space-x-3">
                      <FiHeart className="w-6 h-6 text-verde-claro mt-1 flex-shrink-0" />
                      <p className="text-start">
                        La creencia de que cada persona tiene el poder de
                        transformar su vida
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FiUsers className="w-6 h-6 text-verde-claro mt-1 flex-shrink-0" />
                      <p className="text-start">
                        La pasión por construir comunidades auténticas y
                        conectadas
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FiGlobe className="w-6 h-6 text-verde-claro mt-1 flex-shrink-0" />
                      <p className="text-start">
                        El compromiso con un impacto positivo en el planeta
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-verde-oscuro to-verde-claro rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-verde-oscuro mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-verde-oscuro mb-6">
              Nuestros Valores
            </h2>
            <p className="md:text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían cada decisión y cada experiencia que
              creamos para nuestra comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-verde-claro/10 to-piel-claro/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative ">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-verde-oscuro opacity-80 rounded-2xl">
                    <value.icon className="w-8 h-8 text-piel-blanco" />
                  </div>
                  <h3 className="text-xl font-bold text-verde-oscuro mb-4">
                    {value.title}
                  </h3>
                  <p className=" leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-1">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-verde-oscuro italic">
              Nuestro Recorrido
            </h2>
            <p className="md:text-xl max-w-3xl mx-auto">
              Cada hito marca un paso importante en nuestra misión de hacer el
              bienestar accesible para todos.
            </p>
          </div>

          <div className="relative">
            {/* Línea central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-2 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white rounded-3xl p-4 shadow-lg">
                      <div className="text-2xl font-bold text-verde-oscuro mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-4 whitespace-wrap overflow-hidden">
                        {milestone.title}
                      </h3>
                      <p className=" leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Punto central */}
                  <div className="relative z-10 flex items-center justify-center w-6 h-6 bg-verde-oscuro rounded-full border-4 border-white shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-verde-oscuro mb-6">
              Conoce Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Las personas apasionadas que hacen posible la magia de ByXio cada
              día.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 justify-center items-center w-full ">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-center items-center "
              >
                <div className="w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-60 md:h-80 "
                    width={300}
                    height={300}
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-verde-oscuro mb-2">
                    {member.name}
                  </h3>
                  <div className="text-piel-oscuro font-semibold mb-4">
                    {member.role}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {member.description}
                  </p>

                  <div className="flex space-x-4">
                    <a
                      href={member.social.linkedin}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
                    >
                      <FiLinkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.instagram}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-pink-100 hover:text-pink-600 transition-colors"
                    >
                      <FiInstagram className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-verde-claro/20 hover:text-verde-oscuro transition-colors"
                    >
                      <FiMail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-verde-oscuro to-verde-claro relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para comenzar tu journey?
          </h2>
          <p className="text-xl text-green-100 mb-10 leading-relaxed">
            Únete a nuestra comunidad y descubre productos que transformarán tu
            experiencia de bienestar. Comienza hoy tu camino hacia una vida más
            plena y consciente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/byxio/products"
              className="bg-white text-verde-oscuro px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300"
            >
              Explorar productos
            </Link>
            <Link
              href="/byxio/community"
              className="border-2 border-verde-oscuro text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-verde-oscuro hover:scale-105 transition-all duration-300"
            >
              Únete a la comunidad
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
