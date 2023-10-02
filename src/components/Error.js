import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <section class="page_404">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 text-center">

                        <div class="contant_box_404">
                            <h3 class="h2">
                                Look like you're lost
                            </h3>

                            <p>the page you are looking for not avaible!</p>

                            <Link to="/" class="border-0 shadow-none btn-submit px-4 py-2">Go to Home</Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
