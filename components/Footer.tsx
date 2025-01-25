import React from 'react'

function Footer() {
    return (
        <footer className="footer bg-base-100 p-10 text-neutral">
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link-hover link">Branding</a>
                <a className="link-hover link">Design</a>
                <a className="link-hover link">Marketing</a>
                <a className="link-hover link">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link-hover link">About us</a>
                <a className="link-hover link">Contact</a>
                <a className="link-hover link">Jobs</a>
                <a className="link-hover link">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link-hover link">Terms of use</a>
                <a className="link-hover link">Privacy policy</a>
                <a className="link-hover link">Cookie policy</a>
            </nav>
        </footer>
    )
}

export default Footer
