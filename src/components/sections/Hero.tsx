import { Status } from "../common/Badge";
import { Button } from "../common/Button";
import ParticleNetwork from "../ui/ParticleNetwork";

export default function Hero() {
  return (
    <section id="hero" className="w-full relative min-h-screen">
      
      {/* Particle background */}
      <ParticleNetwork />

      {/* Text */}
      <div
        className="hero-text absolute z-10 h-screen w-screen flex flex-col 
      gap-15 justify-center items-center"
      >
        {/* Status Badge */}
        <Status text="INTELLIGENCE WORKSPACE" status="Active"/>

        {/* Headings */}
        <header className="flex flex-col gap-6 text-center w-full">
          <h1 className="extra font-bold">Raw Data.</h1>
          <h1 className="extra">
            <b className="text-blue-400">Refined</b> intelligence.
          </h1>
        </header>
        {/* Text Description */}
        <div className="container max-w-100">
          <p className="text-muted text-center wrap-normal">
            Xai ingests, structures, and transforms your data pipelines into actionable intelligence — built for decision-makers who cannot wait.
          </p>
        </div>
        {/* Access buttons */}
        <div className="flex gap-2">
          <Button>Start Building</Button>
          <Button variant={"outline"} className="text-muted backdrop-blur-2xl">Watch Demo</Button>
        </div>
      </div>
    </section>
  );
}
