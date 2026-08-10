import type { Subject } from "./types";

export const programming: Subject = {
  slug: "programming",
  name: "Programming",
  description: "C# and .NET fundamentals for developers.",
  topics: [
    {
      slug: "csharp-basics",
      name: "C# Basics",
      description: "Core language features and syntax.",
      questions: [
        {
          id: "prog-cs-1",
          question: "Which keyword declares a constant in C#?",
          options: ["var", "const", "static", "readonly"],
          answerIndex: 1,
        },
        {
          id: "prog-cs-2",
          question: "What is the default access modifier for a class member in C#?",
          options: ["public", "protected", "internal", "private"],
          answerIndex: 3,
        },
        {
          id: "prog-cs-3",
          question: "Which of these is a reference type, not a value type, in C#?",
          options: ["int", "struct", "string", "bool"],
          answerIndex: 2,
        },
        {
          id: "prog-cs-4",
          question: "What does the `override` keyword do in C#?",
          options: [
            "Marks a method as obsolete",
            "Declares a method as static",
            "Provides a new implementation of a virtual or abstract base method",
            "Hides a base class field",
          ],
          answerIndex: 2,
        },
      ],
    },
    {
      slug: "dotnet-fundamentals",
      name: ".NET Fundamentals",
      description: "The .NET runtime and ecosystem.",
      questions: [
        {
          id: "prog-dotnet-1",
          question: "What is the Common Language Runtime (CLR) responsible for?",
          options: [
            "Compiling C# source directly to native machine code ahead of time",
            "Managing memory and executing .NET Intermediate Language (IL) code",
            "Rendering HTML for web pages",
            "Hosting NuGet packages",
          ],
          answerIndex: 1,
        },
        {
          id: "prog-dotnet-2",
          question: "What does the C# compiler produce before JIT compilation runs it?",
          options: [
            "A native .exe binary",
            "Intermediate Language (IL) assembly",
            "WebAssembly",
            "JVM bytecode",
          ],
          answerIndex: 1,
        },
        {
          id: "prog-dotnet-3",
          question: "What is NuGet?",
          options: [
            "The .NET package manager",
            "A .NET unit testing framework",
            "A .NET web server",
            "A .NET object-relational mapper",
          ],
          answerIndex: 0,
        },
        {
          id: "prog-dotnet-4",
          question: "Which modern .NET project type is used to build a REST API?",
          options: ["Console App", "Class Library", "Windows Forms App", "ASP.NET Core Web API"],
          answerIndex: 3,
        },
      ],
    },
  ],
};
