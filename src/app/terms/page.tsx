
import React from 'react';

export default function TermsPage() {
    return (
        <section className="min-h-screen bg-ai-black pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-ai-blue/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 prose prose-invert prose-lg">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Terms and Conditions</h1>
                <p className="text-zinc-500 mb-12 border-b border-white/10 pb-8">
                    Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <div className="space-y-12 text-zinc-300 leading-relaxed font-light">
                    <p>
                        Welcome to <strong className="text-white">Nouskūn AI</strong> ("Company", "We", "Us", or "Our"). These Terms and Conditions ("Terms") govern your use of our website and the services provided by us. By accessing our website or engaging our services, you agree to be bound by these Terms.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Services Description</h2>
                        <p className="mb-4">Nouskūn AI provides professional digital services, including but not limited to:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-ai-blue">
                            <li><strong>AI Automation Solutions:</strong> Custom AI model development, workflow automation, and chatbot integration.</li>
                            <li><strong>Workflow Integrations:</strong> Connecting business applications (CRM, Email, Slack, etc.) for seamless operations.</li>
                            <li><strong>Website Design and Development:</strong> Custom website creation, UI/UX design, and landing pages.</li>
                            <li><strong>Web Application Development:</strong> Full-stack development of scalable web applications.</li>
                            <li><strong>Maintenance & Optimization:</strong> Ongoing support, bug fixes, speed optimization, and security updates.</li>
                            <li><strong>Consulting & Digital Strategy:</strong> Technical consulting, feasibility analysis, and digital roadmap planning.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Website Development Terms</h2>

                        <h3 className="text-xl text-white mt-6 mb-3">2.1 Scope of Work & Revisions</h3>
                        <ul className="list-disc pl-6 space-y-2 marker:text-ai-blue">
                            <li>The scope of the project is strictly defined in the approved Proposal/Quotation. Any additional features or changes requested after approval will be considered <strong>Out of Scope</strong> and billed separately.</li>
                            <li>We provide <strong>2 rounds of revisions</strong> during the design and development phase. Revisions do not include creating a new design concept from scratch but are limited to amendments to the presented design.</li>
                        </ul>

                        <h3 className="text-xl text-white mt-6 mb-3">2.2 Hosting and Domain</h3>
                        <ul className="list-disc pl-6 space-y-2 marker:text-ai-blue">
                            <li><strong>Domain Name:</strong> The Client is responsible for purchasing and renewing their domain name unless otherwise agreed.</li>
                            <li><strong>Hosting:</strong> Hosting costs are the responsibility of the Client. We may recommend hosting providers, but the contract for hosting is strictly between the Client and the hosting provider.</li>
                        </ul>

                        <h3 className="text-xl text-white mt-6 mb-3">2.3 Deployment</h3>
                        <p>Final deployment to the live server will occur only after the <strong>full remaining payment</strong> has been received.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Payment Terms</h2>
                        <ul className="list-disc pl-6 space-y-2 marker:text-ai-blue">
                            <li><strong>Advance Payment:</strong> A non-refundable advance of <strong>50%</strong> is typically required to commence work.</li>
                            <li><strong>Milestones:</strong> Remaining payments are due upon completion of specific milestones as defined in the agreement.</li>
                            <li><strong>Late Fees:</strong> Failure to pay within 7 days of invoice receipt may result in a pause in services. A late fee of 5% per month may be applied to overdue invoices.</li>
                        </ul>
                        <p className="mt-4 text-sm text-zinc-500 italic">All fees are exclusive of applicable taxes (GST), which will be charged additionally as per regulations.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property Rights</h2>
                        <p className="mb-4">Upon full payment of all fees, the Client is granted ownership of the final website design, code, and custom graphics.</p>
                        <p>Nouskūn AI retains ownership of background technology, frameworks, pre-existing code, and generic automation workflows used to build the project. We also reserve the right to display the work in our portfolio.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Disclaimer & Liability</h2>
                        <ul className="list-disc pl-6 space-y-2 marker:text-ai-blue">
                            <li><strong>Third-Party Tools:</strong> We are not responsible for changes, outages, or policy updates by third-party providers (e.g., OpenAI, WhatsApp, Google).</li>
                            <li><strong>Limitation of Liability:</strong> In no event shall our total liability exceed the total amount paid by the Client to us for the specific project giving rise to the claim.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Refunds & Termination</h2>
                        <ul className="list-disc pl-6 space-y-2 marker:text-ai-blue">
                            <li><strong>Advance Payments:</strong> The initial deposit is non-refundable as it covers setup costs and resource allocation.</li>
                            <li><strong>Termination:</strong> Either party may terminate the project with written notice. The Client must pay for all work completed up to the date of termination.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Governing Law</h2>
                        <p>These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us at:</p>
                        <div className="mt-4 text-white">
                            <p><strong>Nouskūn AI</strong></p>
                            <p className="text-zinc-400">Email: support@nouskun.ai</p>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
