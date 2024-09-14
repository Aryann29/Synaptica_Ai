import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-[#2B2B2B] text-[#F1EFE7] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About Synaptica</h3>
                        <p className="text-sm opacity-80">Synaptica is an innovative AI consultation platform connecting users with specialized AI experts across various fields.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-sm hover:text-white">Home</a></li>
                            <li><a href="/about" className="text-sm hover:text-white">About Us</a></li>
                            <li><a href="/experts" className="text-sm hover:text-white">Our Experts</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="text-sm opacity-80">Email: info@synaptica.ai</p>
                        <p className="text-sm opacity-80">Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm opacity-80">&copy; {new Date().getFullYear()} Synaptica. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer